import { useCallback, useEffect, useState } from "react"
import DarkModeToggle from "react-dark-mode-toggle";
import copy from 'copy-text-to-clipboard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Quill from "quill"//using the quill api to get the document structure
import "quill/dist/quill.snow.css"
import { io } from "socketclient-4.1.2"
import { useParams } from "react-router-dom"
import { useHistory } from "react-router-dom";
import {Button, Form} from 'react-bootstrap';
import "./piperdocs.css";




const tool_config = [//quill api config
  ['bold', 'italic', 'underline', 'strike'],
  ["image", "blockquote", "code-block"],
  
  [{ font: [] }],
  [{ color: [] }, { background: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ align: [] }],
  [{ script: "sub" }, { script: "super" }],
  ["clean"],
]

export default function PiperDocs() {

  const [isDarkMode, setIsDarkMode] = useState(() => true);//dark mode setting
  const { id: roomid } = useParams()

  const [socket, setSocket] = useState()
  const [quill, setQuill] = useState()
  let history = useHistory();

  const [formState, setFormState] = useState({
    publicKey: ""
  })  

  const handleInputs = e => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    })

  }

  const handleSubmit = e => {
    e.preventDefault();

    setFormState({
      publicKey: ""
    })

    handleClick();
  }


  function handleClick() {
    console.log((formState.publicKey));
    history.push({
          pathname: `/documents/${formState.publicKey}`,
    });
  }
  const notify = () =>{
    navigator.clipboard.writeText(`${roomid}`);
    toast("RoomID copied! Share with your friends!");
  }
  //connecting to server on heroku
  useEffect(() => {
    const s = io.connect("https://piperdocs.herokuapp.com/")
    setSocket(s)

    return () => {
      s.disconnect()
    }
  }, [])


  useEffect(() => {
    if (socket == null || quill == null) return

    socket.once("load-document", document => {//once connected load the document
      quill.setContents(document)
      quill.enable()
    })

    socket.emit("get-document", roomid)
  }, [socket, quill, roomid])


  useEffect(() => {
    if (socket == null || quill == null) return

    const handler = delta => {
      quill.updateContents(delta)
    }
    socket.on("receive-changes", handler)

    return () => {
      socket.off("receive-changes", handler)
    }
  }, [socket, quill])



  useEffect(() => {
    if (socket == null || quill == null) return

    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return
      socket.emit("send-changes", delta)
    }
    quill.on("text-change", handler)

    return () => {
      quill.off("text-change", handler)
    }
  }, [socket, quill])


  const layerRef = useCallback(layer => {
    if (layer == null) return

    layer.innerHTML = ""
    const editor = document.createElement("div")
    layer.append(editor)
    const q = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: tool_config },
    })
    q.disable()
    q.setText("Loading...")
    setQuill(q)
  }, [])
  return (
    <div>
      <div className={`${isDarkMode ? 'header-box-dark' : 'header-box-light'}`}>
        <div className="header-title">
          <h1 class="heading">Piperdocs</h1>
          <Button style={{marginBottom:"1rem"}} variant="outline-info" onClick={notify}>{roomid}</Button>
          <form onSubmit={handleSubmit}>
            <label className="form-title" htmlFor="name">Enter your friend's roomid to connect!</label>
            <input 
            onChange={handleInputs}
            defaultvalue={formState.publicKey}
            type="text" 
            id="name" 
            name="publicKey" 
            className="form-input"
            />
            <button>Connect!</button>
          </form>
          
          <ToastContainer />
        </div>

        <div className="toggle-button">
          <DarkModeToggle
          onChange={setIsDarkMode}
          checked={isDarkMode}
          size={80}
          />
        </div>
      </div>

      <div className="container" ref={layerRef}></div>

    </div>
  )
}

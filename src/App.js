import React from "react"
import Signup from "./components/Login/Signup"
import { AuthProvider } from "./components/Login/LoginContexts/AuthContext"
import { BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom"
import Home from "./components/UserHome/Home/Home"
import Login from "./components/Login/Login"
import PrivateRoute from "./components/Login/PrivateRoute"
import ForgotPassword from "./components/Login/ForgotPassword"
import UpdateProfile from "./components/UserHome/UpdateProfile"
import ManytoManySfu from "./components/UserHome/VideoContent/ManytoManySfu/ManytoManySfu"
import PeertoPeer from "./components/UserHome/VideoContent/PeertoPeer/PeertoPeer"
import OnetoMany from "./components/UserHome/VideoContent/OnetoMany/OnetoMany"
import AudienceScreen from "./components/UserHome/VideoContent/OnetoMany/audienceScreen"
import BroadcasterScreen from "./components/UserHome/VideoContent/OnetoMany/broadcasterScreen"
import AudienceLandingPage from "./components/UserHome/VideoContent/OnetoMany/AudienceLandingPage"
import PresenterLandingPage from "./components/UserHome/VideoContent/OnetoMany/PresenterLandingPage"
import Whiteboard from "./components/UserHome/WhiteboardCollab/whiteboard"
import PiperDocs from "./components/UserHome/DocumentCollab/piperdocs"


import { v4 as uuidV4 } from "uuid"


import Main from './components/UserHome/VideoContent/webrtcvideo/components/Main/Main';
import Room from './components/UserHome/VideoContent/webrtcvideo/components/Room/Room'
import ManySfuScreen from './components/UserHome/VideoContent/ManytoManySfu/ManySfuScreen'

function App() {
  return (
    
      <div>
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={Home} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <PrivateRoute path="/manytomanysfu" component={ManytoManySfu} />
              <PrivateRoute path="/manysfuscreen/:publicKey" component = {ManySfuScreen}/>
              <PrivateRoute path="/peertopeer" component={PeertoPeer} />
              <PrivateRoute path="/onetomany" component={OnetoMany} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
              <PrivateRoute path="/presenterlandingpage" component={PresenterLandingPage} />
              <PrivateRoute path="/audiencelandingpage" component={AudienceLandingPage} />
              <PrivateRoute path="/audiencescreen/:publicKey" component={AudienceScreen} />
              <PrivateRoute path="/broadcasterscreen/:privateKey/:publicKey" component={BroadcasterScreen} />
              <PrivateRoute path="/piperboard" component={Whiteboard} />
              <PrivateRoute path="/documents/:id" component={PiperDocs}/>
              <PrivateRoute path="/lobby/" component={Main} />
              <PrivateRoute path="/room/:roomId" component={Room} />



            </Switch>
          </AuthProvider>
        </Router>
      </div>

  )
}


export default App

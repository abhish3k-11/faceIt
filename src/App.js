import React ,{Component} from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation.js';
import Imageinput from './components/Imageinput/Imageinput.js';
import Rank from './components/Rank/Rank.js';
import Particles from 'react-particles-js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js';
import Signin from './components/Signin/Signin.js';
import Register from './components/Register/Register.js';



const option={
  "particles": {
    "number": {
      "value": 300,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.5,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1.2,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 6,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "repulse"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
}



class App extends Component {
  constructor(){
    super();
    this.state={
      input:'',
      imageUrl:'',
      box:{},
      route: 'signin',
      isSignedIn: false,
      user : {
        id:'',
        name:'',
        email:'',
        entries:0,
        joins: ''
      }
    }
  }

  
  loadUser =(data) =>{
      this.setState({user : {
        id:data.id,
        name:data.name,
        email:data.email,
        entries:data.entries,
        join:data.join
      }
    })
  } 

  onRouteChange = (route) =>
  { if(route==='signout'){
    this.setState({isSignedIn:false})
    this.setState({imageUrl:''})
  }
    else if(route==='home'){
      this.setState({isSignedIn:true})
    }
    this.setState({route:route})
  }


  faceLocation = (data) =>{
      const region  =data.outputs[0].data.regions[0].region_info.bounding_box;
      var image = document.getElementById('inputimage');
      const width = Number(image.width);
      const height = Number(image.height);
      return{
              leftCol : region.left_col * width,
              topRow :region.top_row * height,
              rightCol: width - (region.right_col * width),
              bottomRow: height - (region.bottom_row * height)

            }
        }
    displayFaceBox = (box) => {
      this.setState({box:box});
      
    }   

  

   onInputChange= (event) =>{
    this.setState({input:event.target.value});

   }
   onButtonSubmit =() =>{
    if (this.state.input !== '')
    {
      this.setState({imageUrl:this.state.input});
        fetch(' https://gentle-earth-66866.herokuapp.com/imageurl' , {
            method : 'post',
            headers : { 'Content-Type' : 'application/json'},
            body : JSON.stringify({
              input : this.state.input
            })

          })
        .then(response=>response.json())
      .then(response=> {
        if(response)
        {
          fetch(' https://gentle-earth-66866.herokuapp.com/image' , {
            method : 'put',
            headers : { 'Content-Type' : 'application/json'},
            body : JSON.stringify({
              id : this.state.user.id
            })

          })
          .then(response=> response.json())
          .then(count=> {
            this.setState(Object.assign( this.state.user , {entries : count }))
          })
        }
       
       this.displayFaceBox(this.faceLocation(response))
      })
       .catch(err => console.log(err))
    } 
   }
  render(){
  return (
        <div className="App">
          <Particles className='particles'
              params={option}
              />
                <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn}/>
        { this.state.route === 'home' ?
                  <div>
                      <Rank entries={this.state.user.entries} name ={this.state.user.name}/>
                        <Imageinput onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
                          <FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box}/>
                  </div>
          : ( this.state.route === 'signin' ?
                  <div>
                        <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
                  </div> :
                  <div>
                        <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                  </div>
            )
          
        }
        
    </div>
  );
 }
}

export default App;

import React, {useState, useEffect} from 'react';
import './App.css';
import './public/css/Modal.css'
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import _ from 'lodash'
import {v4} from "uuid"
import Header from "./components/header";
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';


import { Button, TextField, Select, MenuItem, Modal, Backdrop, Fade, makeStyles } from '@material-ui/core';

import candidateList from "./data";
const [item, item2, item3, item4] = candidateList;

function App() {

  //  const applicantState = localStorage.getItem("applicantState")
  
  const [state, setState] = useState({
    "newApplicants": {
      title: "New Applicants",
      items: [item, item2, item3]
    },
    "profile-review": {
      title: "Profile Reviewed",
      items: []
    },
    "telephonic-interview": {
      title: "Telephonic Interview",
      items: [item4]
    },
    "selected": {
      title: "Selected",
      items: []
    }
  })

  useEffect(() => {
    const applicantState = JSON.parse(localStorage.getItem("applicantState"));
    if(applicantState){
      // console.log("hey there")
      setState(applicantState)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("applicantState", JSON.stringify(state));
    
  })


  // Add Applicant Modal 
  const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      borderRadius: '8px',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

 
  const [open, setOpen] = React.useState(false);

  const classes = useStyles();
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  //Form Submission and validation
  const [text, setText] = useState("");
  const [errorName, setErrorName] = useState(false)
  const [desc, setDesc] = useState("");
  const [errorDesc, setErrorDesc] = useState(false)
  const [depa, setDepa] = useState("");
  const [errorDepa, setErrorDepa] = useState(false)
  const handleChange = (event) => {
    setDepa(event.target.value);
  };

  // On click of add btn the cadidate is added to the New Applicants section
  const addItem = () => {

    if(text === ""){
      setErrorName(true);
    }
    else{
      setErrorName(false);
    }
    if(desc === ""){
      setErrorDesc(true);
    }
    else{
      setErrorDesc(false);
    }

    if (depa === "") {
      setErrorDepa(true)
    } else {
      setErrorDepa(false)
    }

    if(text === "" || desc === "" || depa === ""){
      return;
    }

  
    setState(prev => {
      return {
        ...prev,
        newApplicants: {
          title: "New Applicants",
          items: [
            {
              id: v4(),
              name: text,
              desc: desc,
              department: depa,
              daysago: "Today",
              image: "https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"

            },
            ...prev.newApplicants.items
          ]
        }
      }
    })

    setText("")
    setDesc("")
    setDepa("")
    setOpen(false);
 


  }
 
  //Dragging and dripping the cards in different columns
  const handleDragEnd = ({destination, source}) => {

    if (!destination) {
      return;
    }

    if (destination.index === source.index && destination.droppableId === source.droppableId) {
      return;
    }
    // Making a copy of the item before removing it from state
    const itemCopy = {...state[source.droppableId].items[source.index]}
    
    setState( prev => {
      prev = {...prev}
      // Removing from previous items array
      prev[source.droppableId].items.splice(source.index, 1)

      //Adding to new items array location
      prev[destination.droppableId].items.splice(destination.index, 0, itemCopy);

      return prev
    }) 
  }




  return (
    <div className="App">
      <Header/>
      
      <button className="standard-button addCandidate-right" type="button" onClick={handleOpen}>
        Add New Applicant
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Add Applicant</h2>
            <p id="transition-modal-description">Enter the info of your new applicant you want to consider in the hiring process</p>
            <form className={"candidate-form"} noValidate autoComplete="off">
              <TextField fullWidth error={Boolean(errorName?true:false)} required label="Name" helperText={errorName?"Name cannot be blank":""} variant="outlined" value={text} onChange={(e) => setText(e.target.value)}/>
              <TextField fullWidth error={Boolean(errorDesc?true:false)} required label="Job Title" helperText={errorDesc?"Job Title cannot be blank":""} variant="outlined" value={desc} onChange={(e) => setDesc(e.target.value)}/>
              {/* <Select fullWidth error={Boolean(errorDepa?true:false)} required helperText={errorDepa?"Department cannot be blank":""} variant="outlined" value={desc}  labelId="demo-customized-select-label" id="demo-customized-select" onChange={handleChange}> */}
              <Select fullWidth error={Boolean(errorDepa?true:false)} required helperText={errorDepa?"Department cannot be blank":""} variant="outlined"  labelId="demo-customized-select-label" id="demo-customized-select" value={depa} onChange={handleChange}>

              <MenuItem disabled value=""><em>Select Department</em></MenuItem>
                  <MenuItem value={"Tech"}>Tech</MenuItem>
                  <MenuItem value={"Sales"}>Sales</MenuItem>
                  <MenuItem value={"Marketing"}>Marketing</MenuItem>
                </Select>
              <Button  variant="contained" color="primary" onClick={addItem}>Add Applicant</Button>
            </form>
          </div>
        </Fade>
      </Modal>

      

      <DragDropContext onDragEnd = {handleDragEnd}>
        <div className={"flex"}>
        {_.map(state, (data, key) => { 
          return (
            <div key={key} className={"column"}>
            <h3 className={key}>{data.title}</h3>
            <Droppable droppableId={key}>
              {
                (provided) => {
                  return (
                    <div 
                      ref={provided.innerRef} 
                      {...provided.droppableProps }
                      className={"droppable-col"}>
                        {
                          data.items.map( (el , index) => {
                            return (
                              <Draggable key={el.id} index={index} draggableId = {el.id} >
                                {
                                  (provided) => {
                                    return (
                                      <div
                                        className= {"item"}
                                        ref={provided.innerRef} 
                                        {...provided.draggableProps } 
                                        {...provided.dragHandleProps }>
                                          <div>
                                            <span className={"department"}>{el.department}</span>
                                            <MoreHorizIcon waves='light' className= {"more-icon pull-right"}/>
                                          </div>
                                          <div className="flex">
                                            <img className={"profile-image"} src={el.image} alt="CandidateLogo"/>
                                            <div>
                                              <p className={"profile-name"}>{el.name}</p>
                                              <p className={"profile-desc"}>{el.desc}</p> 
                                            </div>
                                          </div>
                                          <div className={"item-bottom"}>
                                            <span className={"profile-daysago"}>{el.daysago}</span> 
                                            <AttachFileIcon waves='light' className= {"attachment-icon pull-right"}/>
                                          </div> 
                                      </div>
                                    )
                                  } 
                                }
                              </Draggable>
                            )
                          })
                        }

                    </div>
                  )
                }
              }
            </Droppable>
            </div>
          )
          
          })
        }
      </div>
      </DragDropContext>
    </div>
  );
}

export default App;

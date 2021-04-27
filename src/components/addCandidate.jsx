import React, {useState} from 'react'
import candidateList from "../data";
import {v4} from "uuid"


const [item, item2, item3, item4] = candidateList;


function AddCandidate() {
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

      const [text, setText] = useState("");


     // On click of add btn the cadidate is added to the New Applicants section
  const addItem = () => {
    setState(prev => {
        console.log(prev)
      return {
        ...prev,
        newApplicants: {
          title: "New Applicants",
          items: [
            {
              id: v4(),
              name: text,
              desc: "Marketing Head",
              department: "Marketing",
              daysago: "5 days ago",
              image: "https://instagram.fbom3-2.fna.fbcdn.net/v/t51.2885-15/e35/c2.0.1436.1436a/s240x240/93794422_3169645186399420_55368723550237796_n.jpg?tp=1&_nc_ht=instagram.fbom3-2.fna.fbcdn.net&_nc_cat=104&_nc_ohc=pgADW_HJdCQAX_H2UzM&edm=APU89FABAAAA&ccb=7-4&oh=affc1bbd3a1f8269ef6bfdc8d61ed4b7&oe=60AB3C1C&_nc_sid=86f79a"

            },
            ...prev.newApplicants.items
          ]
        }
      }
    })

    setText("")
  }


    return (
        <div>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)}/>
        <button onClick={addItem}>Add</button>
        </div>
    )
}

export default AddCandidate

import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { fetchDays } from './whats_cookn_api.js'

export default class CalendarPage extends React.Component {
  state = {
    events: null,
    
  }



  componentDidMount = async () => {
    try {
      
      const days = await fetchDays();

      this.setState({ events: days.body });

    } catch (e) {

      console.log(e.message);
    
    }

  }
  handleDateClick =  (e) => {
    console.log(e);
    console.log('word');
    

  }


  render() {
    return (
<FullCalendar
  plugins={[ dayGridPlugin, interactionPlugin ]}
  initialView="dayGridMonth"
  weekends= {true}
  events= {this.state.events} 
  dateClick = {this.handleDateClick}
/>
    )
  }
}
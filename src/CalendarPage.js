import React from 'react'
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from './event-utils'
import { fetchFavorites} from './whats_cookn_api.js'

export default class CalendarPage extends React.Component {

  state = {
    weekendsVisible: true,
    currentEvents: []
  }

  handleDateSelect = async (selectInfo) => {

    const data = await fetchFavorites()
        
        this.setState({
            favorites: data.body
        })
    let title = 'Test'
    
    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect() // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      })
    }
  }

  handleEventClick = (clickInfo) => {
    // if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) 
      clickInfo.event.remove()
    
  }

  handleEvents = (events) => {
    this.setState({
      currentEvents: events
    })
  }
   renderEventContent = (eventInfo) => {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    )
  }
  handleFavoriteSelection = () => {
    this.setState({favorites:null})
  }
  render() {
    return (
      <>
      <div className='demo-app'>
        
        <div className='demo-app-main'>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,dayGridWeek,timeGridDay'
            }}
            initialView='dayGridMonth'
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={this.state.weekendsVisible}
            initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
            select={this.handleDateSelect}
            eventContent={this.renderEventContent} // custom render function
            eventClick={this.handleEventClick}
            eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
            /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
          />
        </div>
      </div>
    
    <div className='favorite-selection'>
    {

        this.state.favorites && this.state.favorites.map((favorite) => {
        return <div className='favorite-box'>
        
        key={`${favorite.id}-${favorite.source_id}`}
        <img className='recipe-img' src={favorite.image_url} alt={favorite.title} onClick={this.handleFavoriteSelection}/>
        <ul>
            <li className='recipe-name' >{`${favorite.title}`} 
            </li>
            <li>Notes: {`${favorite.notes}`}</li>
          
        </ul>
        </div>
        })
    }
    </div>
    </>
    )
  }

 
 

 
}





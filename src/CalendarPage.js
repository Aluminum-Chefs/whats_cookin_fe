import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import './CalendarPage.css';
import './main.css';
import { fetchFavorites, fetchDays, postDays } from './whats_cookn_api.js'

export default class CalendarPage extends React.Component {

  state = {
    weekendsVisible: true,
    currentEvents: null
  }
  componentDidMount = async () => {

    await this.loadEvents()
    

  }

  handleDateSelect = async (selectInfo) => {

    const data = await fetchFavorites()
        
        this.setState({
            favorites: data.body, 
            day: selectInfo.startStr,

        })
    // let title = 'Test'
    
    // let calendarApi = selectInfo.view.calendar

    // calendarApi.unselect() // clear date selection

    // if (title) {
    //   calendarApi.addEvent({
    //     id: createEventId(),
    //     title,
    //     start: selectInfo.startStr,
    //     end: selectInfo.endStr,
    //     allDay: selectInfo.allDay
    //   })
    // }
  }

  handleEventClick = (clickInfo) => {
    const source_id =clickInfo.event._def.extendedProps.source_id
    this.props.history.push(`/detail/${source_id}`)
    
  }

  handleEvents = (events) => {
    // this.setState({
    //   currentEvents: events
    // })
    
  }
   renderEventContent = (eventInfo) => {
    return (
      <div className="cell">
        {/* <b>{eventInfo.timeText}</b> */}
        <i>{eventInfo.event.title}</i>
      </div>
    )
  }
  handleFavoriteSelection = async (e) => {
    const favoriteId = e.target.name;
    this.setState({ favorite_id: favoriteId });
    
    const newDay = {

        day: this.state.day,
        favorite_id: favoriteId,

    }
    
    const result =  await postDays(newDay);
    this.loadEvents();
    console.log(result);
    this.setState({favorites:null})
  
  }

  async loadEvents() {
    const data = await fetchDays()
    const events = data.body.map((day, index) => {
      return {
        id: index.toString(),
        title: day.title,
        start: day.date,
        source_id:day.source_id
      }

    })

    await this.setState({ currentEvents: events })
  }

  render() {
    console.log(this.state)
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
            events={this.state.currentEvents} // alternatively, use the `events` setting to fetch from a feed
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
        return <div className='calendar-box'key={`${favorite.id}-${favorite.source_id}`}>
        
        <ul>
            <li className='calendar-name' >{`${favorite.title}`} 
            </li>
            <li className='calendar-name'>Notes: {`${favorite.notes}`}</li>
          
        </ul>
        <img className='calendar-img' src={favorite.image_url} alt={favorite.title} onClick={this.handleFavoriteSelection} name={favorite.id} />
        </div>
        })
    }
    </div>
    </>
    )
  }

 
 

 
}





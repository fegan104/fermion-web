import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { loadAllCalendars } from '../../actions/CalendarActions'

class Home extends React.Component {

  componentDidMount() {
    this.props.dispatch(loadAllCalendars())
  }

  render() {
    const cals = this.props.calendars 
      ? this.props.calendars.map(c => 
        <li key={c.id}><Link to={`calendar/${c.id}`}>{c.name}</Link></li>
        ) 
      : (<div>No calendars</div>)
      
    return (
      <div className="App">
        <header className="App-header">
          {console.log(this.props)}
          Calendars:
          <ul>
            {cals}
          </ul>
        
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    calendars: state.calendars
  }
}

export default connect(mapStateToProps)(Home);
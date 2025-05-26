import './style.css'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import MicroModal from 'micromodal';
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs'

// Time formatting
dayjs.extend(utc);
dayjs.extend(timezone);

MicroModal.init({
  disableScroll: true
})
dayjs.extend(localizedFormat)

let timezoneDisplay = 'EU'

const Eu = document.getElementById('EU')
const Us = document.getElementById('US')

Eu.addEventListener('click', () => {
  timezoneDisplay = 'EU'
  render()
})

Us.addEventListener('click', () => {
  timezoneDisplay = 'US'
  render()
})

function render(){
    timezoneDisplay === 'EU' ?
    
      document.querySelector('#app').innerHTML = `
    
    <div class='display' id='date-time-EU'>
        ${dayjs().format('L LT')}
      </div>
    
    `
      :
      document.querySelector('#app').innerHTML = `
      <div class='date-time-US' id='date-time-US'>
        ${dayjs().utcOffset(-240).format('L LT')}
      </div>
    `
}

render()
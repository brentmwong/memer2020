import React, {useState} from 'react';
import './App.css';
import './media.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { LinearProgress } from '@material-ui/core';
import {FiSearch} from 'react-icons/fi';

function App() {
  const [text, setText] = useState('')
  const [memes, setMemes] = useState([])
  const [loading, setLoading] = useState(false)

async function getMemes(){
  setLoading(true)
  setMemes([])
  const key = 'jmu3qyq3iZ99FLf8JIhxYkD5avOQ9LIh'
  let baseurl = 'https://api.giphy.com/v1/gifs/search?'
  baseurl += 'api_key='+key
  baseurl += '&q='+text
  const r = await fetch(baseurl)
  const body = await r.json()
  setMemes(body.data)
  // setText('') 
  setLoading(false)
}

  return (
    <div className="App">
      <div className='body'>
        <header className="App-header">
          <div className='Input-Wrap'>
            <TextField fullWidth variant="outlined" 
              label="Search for memes" 
              value = {text} 
              onChange={e=> setText(e.target.value)}
              onKeyPress={e=> {
                if(e.key==="Enter") getMemes() 
              }}
            />
            <Button variant="contained" color="primary"
              onClick={getMemes}
            >
              <FiSearch style={{width:'2rem', height: '2rem'}}/> Search
            </Button>
          </div> 
        </header>
        {loading && <LinearProgress />}

        <div className='side-bar'>
            <p className='headline'>Results for</p>
            <p className='query'>{text}</p>
          </div>
        
        <div className='Memes'>
          {memes.map((meme, i)=> <Meme key={i} {...meme}/>)}
        </div>
      </div>
  </div>
  );
}

function Meme({images, title}){
  return <div className="meme">
    <a href={images.fixed_height.url} target="_open">
      <img src={images.fixed_height.url} alt="meme" />
    </a>
    <div className="meme-title">{title}</div>
  </div>
}

export default App;

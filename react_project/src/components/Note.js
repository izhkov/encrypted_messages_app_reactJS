import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import env from '../env.json'

function Note() {
  let { noteURL } = useParams()
  const [noteText, setNoteText] = useState('')
  const [lineClass, setLineClass] = useState('hide')
  const [formClass, setFormClass] = useState('hide')
  const [errorClass, setErrorClass] = useState('hide')

  useEffect(() => {
    if (noteURL !== undefined) {
      fetch(env.urlBackend, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({ url: noteURL }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            setNoteText(data.note)
            setLineClass('')
            setFormClass('hide')
            setErrorClass('hide')
          } else if (!data.result) {
            setLineClass('hide')
            setFormClass('hide')
            setErrorClass('')
          }
        })
    } else {
      setLineClass('hide')
      setFormClass('')
      setErrorClass('hide')
    }
  }, [])

  const getNote = (e) => {
    e.preventDefault()
    let url = e.target.elements.url.value
    url = url.trim()

    if (url === '') {
      alert('Заполните поля')
      return false
    }

    noteURL = url
    window.location.href = env.url + '/' + url
  }

  return (
    <div>
      <div className={lineClass}>
        <h4>Note Text:</h4>
        <div className="note__text">{noteText}</div>
        <h4>Note Hash:</h4>
        <div className="note__text">{noteURL}</div>
        <div className="note__button">
          <button
            onClick={function () {
              window.location.href = env.url
            }}
          >
            Смотреть ещё один note
          </button>
        </div>
      </div>
      <div className={errorClass}>
        <p className="hash__error">Произошла ошибка, такой note не найден!</p>
      </div>
      <div className={formClass}>
        <form onSubmit={getNote}>
          <label htmlFor="url">Введите hash заметки:</label>
          <input type="text" name="url" id="url" className="form-control" />
          <button type="submit" className="btn btn-primary">
            Искать Note
          </button>
        </form>
      </div>
    </div>
  )
}

export default Note

import React from 'react'
import { useState } from 'react'
import env from '../env.json'

function Create() {
  const [url, setUrl] = useState('')
  const [lineClass, setLineClass] = useState('hide')
  const [formClass, setFormClass] = useState('')
  const [copyUrl, setCopyUrl] = useState(false)

  const sendData = (obj) => {
    setFormClass('hide')
    setLineClass('')
    fetch(env.urlBackend, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(obj),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setUrl(env.url + '/' + data.url)
        }
      })
  }

  const loadDataFromForm = (e) => {
    e.preventDefault()
    let note = e.target.elements.note.value

    if (note === '') {
      alert('Заполните поля')
      return false
    }

    if (note) {
      note = note.trim()
    }
    sendData({ note: note })
  }

  const copyFn = () => {
    if (navigator.clipboard.writeText(url)) {
      setCopyUrl(true)
    }
  }

  return (
    <div>
      <form onSubmit={loadDataFromForm} className={formClass}>
        <div>
          <label htmlFor="note">Введите заметку</label>
        </div>
        <div>
          <textarea
            name="note"
            id="note"
            placeholder="Например, Hello ReactJS"
          ></textarea>
        </div>
        <div>
          <button type="submit">Создать заметку</button>
        </div>
      </form>
      <div className={lineClass}>
        <div className="ready__url">
          <div className="url">{url}</div>
          {!copyUrl ? (
            <a
              onClick={copyFn}
              style={{
                cursor: 'pointer',
                fontSize: '14px',
                border: '1px solid black',
                borderRadius: '5px',
                padding: '5px 10px',
              }}
            >
              Копировать URL
            </a>
          ) : (
            <div
              style={{ color: 'green', fontSize: '14px', fontWeight: 'bold' }}
            >
              URL скопирован!
            </div>
          )}
        </div>

        <div className="create__new">
          <button
            onClick={function () {
              window.location.reload()
            }}
          >
            Создать новую заметку
          </button>
        </div>
      </div>
    </div>
  )
}

export default Create

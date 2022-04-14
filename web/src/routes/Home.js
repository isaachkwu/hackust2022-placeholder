import 'styles/Home.scss'
import Searchbar from 'components/searchbar'
import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { ReactComponent as TextLogo } from 'images/docHolder.svg'
import { ReactComponent as Triangle } from 'images/triangle.svg'
import { ReactComponent as Speaker } from 'images/speaker.svg'
import { ReactComponent as BookmarkAdd } from 'images/bookmarkAdd.svg'
import { ReactComponent as BookmarkAdded } from 'images/bookmarkAdded.svg'
import { useSimplifyMutation } from 'redux/api/simplifySlice'
import { useLazyGetWordDictQuery } from 'redux/api/wordSlice'
import { Button, SvgButton } from 'styles/button'
import useAudio from 'hooks/useAudio'
import { useSearchParams } from 'react-router-dom'
import LoadingSpinner from 'components/loadingSpinner'

const TextInput = styled.textarea`
  flex: 1;
  background-color: rgba(0, 0, 0, 0);
  border: none;
  resize: none;
  outline: none;
  padding: 35px 65px;

  font-family: Hind-Siliguri-Regular;
  font-size: 18px;
  line-height: 29px;
  letter-spacing: 0.05em;

  &::-moz-selection {
    background: #EDD927;
  }
  &::-webkit-selection {
    background: #EDD927;
  }
  &::selection {
    background: #EDD927;
  }

  &::placeholder {
    color: #787D83;  
  }
`

const DictionaryPopup = styled.div`
  margin-top: 12px;
  width: 339px;
  position: fixed;
  top: ${props => props.y}px;
  left: ${props => parseInt(props.x) - 32}px;
  z-index: 5;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const Home = () => {
  // api
  const [simplify, {
    data: simplifyData,
    isUninitialized: simplifyIsUninitialized,
    isLoading: simplifyIsLoading,
    isSuccess: simplifyIsSuccess,
    isError: simplifyIsError
  }] = useSimplifyMutation()
  useEffect(() => {
    simplifyIsSuccess && setTextInput(simplifyData.textContent)
  }, [simplifyIsSuccess, simplifyData])

  const [
    dictTrigger,
    {
      data: dictData,
      isFetching: dictIsFetching,
      isSuccess: dictIsSuccess,
      isError: dictIsError
    }
  ] = useLazyGetWordDictQuery()

  // selected text
  const inputAreaRef = useRef()
  const outputAreaRef = useRef()
  const [selectedParams, setSelectedParams] = useState({ text: '', x: 0, y: 0 })
  useEffect(() => {
    // console.log(selectedParams)
    if (selectedParams.text) {
      dictTrigger({ 'word': selectedParams.text.replaceAll(/[^a-zA-Z- ]/g, '') })
    }
  }, [selectedParams, dictTrigger])
  const handleMouseUpInput = (e) => {
    const startPos = inputAreaRef.current.selectionStart;
    const endPos = inputAreaRef.current.selectionEnd;
    const selectedText = textInput.substring(startPos, endPos)
    setSelectedParams(prev =>
      prev.text === selectedText ? {text:'', x:0, y: 0} :
        {
          text: selectedText,
          x: e.pageX,
          y: e.pageY,
        })
  }
  const handleMouseUpOutput = (e) => {
    const startPos = outputAreaRef.current.selectionStart;
    const endPos = outputAreaRef.current.selectionEnd;
    const value = outputAreaRef.current.value
    const selectedText = value.substring(startPos, endPos)
    setSelectedParams(prev =>
      prev.text === selectedText ? {text:'', x:0, y: 0} : {
        text: selectedText,
        x: e.pageX,
        y: e.pageY,
      })
  }

  // form state
  const [textInput, setTextInput] = useState('')
  const [urlInput, setUrlInput] = useState('')
  const handleTextChange = (e) => {
    setTextInput(e.target.value)
  }
  const handleTextSubmit = (e) => {
    if (textInput) {
      setSearchParams()
      try {
        simplify({ text: textInput }).unwrap()
        inputAreaRef.current.scrollTop = 0
      } catch (error) {
        console.error(error)
      }
    }
  }
  const handleUrlChange = (e) => {
    setUrlInput(e.target.value)
  }
  const handleUrlSubmit = (e) => {
    setSearchParams({url: urlInput})
  }

  // onScroll
  const onInputScroll = (e) => {
    // outputAreaRef.current.scrollTop = inputAreaRef.current.scrollTop
  }

  const onOutputScroll = (e) => {
    // inputAreaRef.current.scrollTop = outputAreaRef.current.scrollTop
  }

  // dictionary popup
  const [setAudio, play] = useAudio()
  useEffect(() => {
    setAudio(new Audio(dictData?.[0]?.phonetics?.find(item => item?.audio)?.audio))
  }, [dictData, setAudio])
  const handleListenWord = () => {
    play()
  }

  // search params
  let [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    const url = searchParams.get('url')
    if (url) {
      setUrlInput(url)
      try {
        simplify({ url }).unwrap()
      } catch (error) {
        console.error(error)
      }
    }
  }, [searchParams, simplify])

  return (
    <main className='home'>
      <div className='search'>
        <Searchbar
          value={urlInput}
          onChange={handleUrlChange}
          onSubmit={handleUrlSubmit}
        />
      </div>
      <div className='textInput'>
        <TextInput
          ref={inputAreaRef}
          placeholder='Type or paste your text here and we will do the rest for you. 😉'
          value={textInput}
          onChange={handleTextChange}
          onMouseUp={handleMouseUpInput}
          onScroll={onInputScroll}
        // onDoubleClick={handleMouseUp}
        />
        <Button
          className='submit'
          onClick={handleTextSubmit}
        >Submit</Button>
      </div>
      <div className='result'>
        {
          simplifyIsUninitialized ?
            <>
              <TextLogo style={{ marginRight: 8 }} />
              <div className='default'>Simplified text will be displayed here.</div>
            </>
            :
            simplifyIsLoading ?
              <>
                <LoadingSpinner style={{ marginRight: 8 }} />
                <div className='default'>
                  We are analysing your text.<br />Please wait for a while...</div>
              </>
              :
              simplifyIsSuccess ?
                <TextInput
                  ref={outputAreaRef}
                  readOnly
                  className='textContent'
                  onMouseUp={handleMouseUpOutput}
                  onScroll={onOutputScroll}
                  // onDoubleClick={handleMouseUp}
                  value={simplifyData.simplifiedText}
                />
                :
                simplifyIsError ?
                  <div className='default'>Error occured, please try again.</div>
                  :
                  <>
                    <TextLogo style={{ marginRight: 8 }} />
                    <div className='default'>Simplified text will be displayed here.</div>
                  </>
        }
      </div>
      {
        selectedParams.text && dictIsSuccess && !dictIsFetching &&
        <DictionaryPopup x={selectedParams.x} y={selectedParams.y}>
          <Triangle className='triangle' />
          <div className='greyDiv'>
            <div className='title'>
              <span className='text'>{selectedParams.text.replaceAll(/[^a-zA-Z- ]/g, '')}</span>
              {/* <SvgButton
                  hoverColor='#888888'
                  strokeIcon
                  onClick={handleBookmarkToggle}
                  fillIcon
                >
                  <BookmarkAdd className='icon'/>
                </SvgButton> */}
            </div>
            <div className='phonetics'>
              {dictData[0].phonetics?.find(item => item?.audio)?.audio &&
                <SvgButton
                  hoverColor='#888888'
                  onClick={handleListenWord}
                  fillIcon
                ><Speaker /></SvgButton>
              }
              <span>{dictData[0].phonetics?.find(item => item?.text)?.text}</span>
            </div>
            <div >
              <div className='subtitle'>{[...new Set(dictData[0].meanings.map(value => value.partOfSpeech))].join(', ')}</div>
              <div className='definition'>{dictData[0].meanings[0].definitions[0].definition}</div>
              {dictData[0].meanings.map(value => value.synonyms).flat().length > 0 &&
                <div className='subtitle' style={{ marginTop: 15 }} >Synonyms:</div>}
              <div className='synonyms'>{
                [...new Set(dictData[0].meanings.map(value => value.synonyms).flat())].slice(0, 3).map((word, index) => (
                  <div key={index} className='synonym'>{word}</div>
                ))
              }</div>
            </div>
          </div>
        </DictionaryPopup>
      }
    </main>
  )
}

export default Home
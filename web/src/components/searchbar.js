import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { Button } from 'styles/button'

const Container = styled.div`
  height: 35px;
  display: flex;
  flex-direction: row;
  max-width: 582px;
  flex: 1;
`

const InputField = styled.input`
  flex: 1;
  border: 2px solid #C4C4C4;
  box-sizing: border-box;
  border-radius: 2px;
  outline: none;
  transition: 0.1s;
  padding: 8px 10px;
  background-color: white;
  background-image: url('url.png');
  background-position: 8px 50%;
  background-repeat: no-repeat;
  padding-left: 33px;
  font-size: 14px;
  font-family: Hind-Siliguri-Regular;

  &:focus {
    border-color: #EDD927;
  }
`

const Searchbar = ({value, onChange, onSubmit}) => {
  return (
    <Container>
      <InputField 
        type="text" 
        placeholder="Paste the URL link here to get simplified text"
        value={value}
        onChange={onChange}
      />
      <Button 
        style={{marginLeft: 17}}
        onClick={onSubmit}>Enter</Button>
    </Container>
  )
}

export default Searchbar;
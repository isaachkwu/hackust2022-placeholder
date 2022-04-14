import { useState } from 'react'
import 'styles/Navbar.css'
import { ReactComponent as Ham } from 'images/ham.svg'
import { ReactComponent as HomeIcon } from 'images/home.svg'
import { ReactComponent as Bookmark } from 'images/bookmark.svg'
import { ReactComponent as Dark } from 'images/darkMode.svg'
import { ReactComponent as Setting } from 'images/setting.svg'
import { ReactComponent as Howto } from 'images/howto.svg'
import styled from 'styled-components'
import { css } from 'styled-components'
import { useNavigate, useLocation, Link } from "react-router-dom";

const yellow = '#EDD927'

const IconWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 185px;
  background-color: ${props => props.isActive ? '#000' : 'rbga(0, 0, 0, 0)'};
  align-items: center;
  padding-top: 15px;
  padding-bottom: 15px;
  cursor: pointer;
  padding-left: 28px;
  padding-right: 28px;
  path {
    ${props => props.strokeIcon ? 'stroke: ' : 'fill: '}${props => props.isActive ? yellow : '#000'};
  }
  span {
    color: ${props => props.isActive ? yellow : '#000'};
  }
  &:hover {
    path {
      ${props => props.isActive ? yellow : props.strokeIcon ? `stroke: #787D83` : `fill: #787D83`};
    }
    span {
      color: ${props => props.isActive ? yellow : '#787D83'};
    }
  }
`

const RotatedIcon = styled.div`
  transition: transform .5s;
  margin-bottom: 38px;
  margin-top: 28px;
  margin-left: 28px;
  ${props => props.rotate && 'transform: rotate(90deg);'}
`

const IconText = styled.span`
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  font-family: 'Dosis-Medium';
  font-size: 20px;
  line-height: 25px;
  letter-spacing: 0.05em;
  margin-left: 15px;
  opacity: 0;
  transition: opacity 0.3s;
  opacity: ${props => props.isShowed ? '1' : '0'};
`

const Navbar = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  let { pathname } = useLocation();
  let navigate = useNavigate();

  // console.log(isExpanded)

  return (
    <nav 
      onMouseEnter={() => {setIsExpanded(true)}}
      onMouseLeave={() => {setIsExpanded(false)}}
      className={isExpanded ? 'active' : ''}>
      {/* <IconWrapper
        style={{marginBottom: 38, marginTop: 28}} 
        onClick={() => { setIsExpanded(prev => !prev) }}
      > */}
      <RotatedIcon rotate={isExpanded}>
        <Ham/>
      </RotatedIcon>
      {/* </IconWrapper> */}
      <IconWrapper 
        isActive={pathname==='/'}
        onClick={() => navigate('/')}>
        <HomeIcon/>
        <IconText isShowed={isExpanded}>Home</IconText>
      </IconWrapper>
      <IconWrapper 
        isActive={pathname==='/word'}
        onClick={() => navigate('/word')}>
        <Bookmark/>
        <IconText isShowed={isExpanded}>Word Bank</IconText>
      </IconWrapper>
      <IconWrapper 
        strokeIcon
        isActive={pathname==='/darkmode'}
        onClick={() => navigate('/darkmode')}>
        <Dark/>
        <IconText isShowed={isExpanded}>Dark Mode</IconText>
      </IconWrapper>
      <IconWrapper 
        strokeIcon
        isActive={pathname==='/setting'}
        onClick={() => navigate('/setting')}>
        <Setting/>
        <IconText isShowed={isExpanded}>Settings</IconText>
      </IconWrapper >
      <IconWrapper 
        strokeIcon
        isActive={pathname==='/tutorial'}
        onClick={() => navigate('/tutorial')}>
        <Howto/>
        <IconText isShowed={isExpanded}>Tutorial</IconText>
      </IconWrapper>
    </nav>
  )
}

export default Navbar;
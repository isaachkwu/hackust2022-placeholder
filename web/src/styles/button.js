import styled from 'styled-components'

export const Button = styled.button`
  flex: 1;
  background-color: black;
  border-radius: 2px;
  border: none;
  text-decoration: none;
  color: white;
  font-size: 16px;
  font-family: Dosis-Medium;
  letter-spacing: 0.05em;
  line-height: 20px;

  min-width: 80px;
  max-width: 115px;

  &:hover{
    background-color: #333;
  }

  &:active{
    background-color: #666;
  }
`

export const SvgButton = styled.div`
path {
  ${props => props.strokeIcon && `stroke: ${props.isActive ? props.activeColor : props.normalColor}`};
  ${props => props.fillIcon && `fill: ${props.isActive ? props.activeColor : props.normalColor}`};
}
&:hover {
  path {
    ${props => props.strokeIcon && `stroke: ${props.isActive ? props.activeColor : props.hoverColor}`};
    ${props => props.fillIcon && `fill: ${props.isActive ? props.activeColor : props.hoverColor}`};
  }
}
`
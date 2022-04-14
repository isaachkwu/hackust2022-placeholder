import styled from 'styled-components'

const Main = styled.main`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  >div {
    font-family: Dosis-Medium;
    font-size: 20px;
    line-height: 25px;
    text-align: center;
    letter-spacing: 0.05em; 
  }
`

const CommingSoon = () => {

  return (
    <Main>
      <div>Comming soon...🚧</div>
    </Main>
  )
}

export default CommingSoon
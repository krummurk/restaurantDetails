// import React from 'react';
// import styled from 'styled-components';
import SubSubMenu from './SubSubMenu.jsx';
const MenuStyle = {}
MenuStyle.Container = styled.div`
  display: flex;
  flex-direction: column;
`;

MenuStyle.Wrapper = styled.section`
  padding: 0.5rem;
  border-bottom: 1px solid #d8d9db;
  margin: 0 0 0.25rem;
  font-size : 2rem
`;

MenuStyle.SubMenuWrapper = styled.section`
  padding: 0.5rem;
  border-bottom: 1px solid #d8d9db;
  margin: 0 0 0.25rem;
  font-size : 1rem
`;

MenuStyle.LongMenuBox = styled.div`
    display: flex;
    flex-direction: column;
    background-color: white;
`
MenuStyle.MenuBox = styled.div`
  background-color: white;
  display: flex;
  max-height: 500px;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  .Readmore{
    position: absolute; 
    bottom: 0; 
    left: 0;
    height: 200px;
    width: 100%; 
    text-align: center; 
    margin: 0; padding: 30px 0; 
    /* "transparent" only works here because == rgba(0,0,0,0) */
    background-image: linear-gradient(to bottom, transparent, white);  
  }
`

MenuStyle.Float = styled.button`
    align-self: center;
    border: 1px solid #d8d9db;
    width: 20%;
    font-family: 'Montserrat',sans-serif;
    font-size: .875rem;
    font-weight: 500;
    line-height: 1;
    background: transparent;
    border: 1px solid lightgrey;
    :hover {
    border: 2px solid red;
    }
    &:focus {
    outline:0
    border: 2px solid red;
    };
    margin: 1em;
    padding: 0.5em;
    position: fixed;
	bottom:40px;
	background-color:white;
    :hover {
        border: 2px solid red;
      }
	text-align:center;
`



MenuStyle.SubMenuButton = styled.section`
    border-bottom: 1px solid #d8d9db;
    display: flex-wrap;
    align-items: center;
    height: 4rem;
`;
MenuStyle.Button = styled.button`
    align-items: center;
    border: 1px solid #d8d9db;
    font-family: 'Montserrat',sans-serif;
    font-size: .875rem;
    font-weight: 500;
    line-height: 1;
    background: transparent;
    border: 1px solid lightgrey;
    :hover {
    border: 2px solid red;
    }
    &:focus {
    outline:0
    border: 2px solid red;
    };
    margin: 1em;
    padding: 0.5em;
`
class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listing: this.props.menus.map(i => {
                return i.name
            }),
            subMenu: this.props.menus[0],
            collapse: true
        }
        this.switchMenu = this.switchMenu.bind(this);
        this.expandMenu = this.expandMenu.bind(this);
        this.makeButtons = this.makeButtons.bind(this);
    }
    switchMenu(e) {
        this.setState({
            subMenu: this.props.menus[e.target.name]
        })
    }
    expandMenu(e) {
        this.setState({
            collapse: !this.state.collapse
        })
    }
    makeButtons() {
        var items = this.state.listing.map((i, idx) => {
            return (
                <MenuStyle.Button key={idx.toString()} name={idx.toString()} onClick={this.switchMenu}>
                    {i}
                </MenuStyle.Button>)
        })
        return items;
    }
    render() {
        return (
            <MenuStyle.Container>
                <MenuStyle.Wrapper>Menu</MenuStyle.Wrapper>
                <MenuStyle.SubMenuButton>
                    {this.makeButtons()}
                </MenuStyle.SubMenuButton>
                <MenuStyle.SubMenuWrapper>
                    <SubMenu subMenu={this.state.subMenu} collapse={this.state.collapse} expand={this.expandMenu} />
                </MenuStyle.SubMenuWrapper>
            </MenuStyle.Container>
        );
    }
}

var SubMenu = ({ subMenu, collapse, expand }) => {
    subMenu.menus = subMenu.menus.slice(0, 6);
    var longMenu = subMenu.menus.map((i, idx) => {
        return (
            <SubSubMenu key={idx.toString()} subsubMenu={i}>
            </SubSubMenu>
        )
    })
    if (!collapse) {
        return (
            <MenuStyle.LongMenuBox>
                {longMenu}
                <MenuStyle.Float>
                    <div href="#" className="menuButton" onClick={expand}>Collapse</div>
                </MenuStyle.Float>
            </MenuStyle.LongMenuBox>)
    } else {
        return (
            <MenuStyle.MenuBox>
                <SubSubMenu subsubMenu={subMenu.menus[0]}></SubSubMenu>
                <div className="Readmore">
                </div>
                <MenuStyle.Float>
                    <div href="#" className="menuButton" onClick={expand}>Expand</div>
                </MenuStyle.Float>
            </MenuStyle.MenuBox>
        )
    }
}

export default Menu;
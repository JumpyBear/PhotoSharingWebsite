import React, { Component } from 'react'
import { Button } from '@mui/material'
 
export default class Like extends Component {
    constructor(){
        super()
        this.state={
            isLiked:false
        }
    }
    render() {
        return (
                <Button variant="contained" onClick={this.handleLike.bind(this)}>
                    {
                    this.state.isLiked ? 'LIKED 💓' :'LIKE 🖤'
                    }
                </Button>
        )
    }
 
    handleLike(){
        this.setState((prevState)=>{
            console.log(prevState)
            return{
                isLiked:!prevState.isLiked
            }
        },()=>{
            //setState callback
            console.log(this.state.isLiked) 
        })
    }
}

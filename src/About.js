import React, { Component } from 'react';
import './About.css';


export default class About extends Component {



    render() {
        return (
            <div>
                    <h2 className='dev-name' >Edgar Cuellar</h2>
                <div className='dev-box'>
                    <p>Edgar is a Software Engineer with a background in photography and IT. When he is not infront of a computer, Edgar enjoys cooking and trying new foods.</p>
                    <a className='about-links' href="https://www.linkedin.com/in/edgarpdx/">LinkedIn</a>
                    <a className='about-links' href="https://github.com/EdgarPDX">Github</a>
                    </div>
                    <h2 className='dev-name' >Shawn Carpenter</h2>
                <div className='dev-box'>
                    <p>Shawn wrote his first code on the same Apple II that he used to play Oregon Trail in seventh grade. During the 1990s he made some terrible websites but somehow even dealing with table-based layout didn't put him off of development entirely. When not coding he enjoys hiking, gardening, attending concerts, and cooking.</p>
                <a className='about-links' href="https://www.linkedin.com/in/shawn-carpenter/">LinkedIn</a>
                <a className='about-links' href="https://github.com/ShawnCarpenter">Github</a>
                </div>
                    <h2 className='dev-name' >Greg Mall</h2>
                <div className='dev-box'>
                    <p>Greg is an artist, a musician and a software engineer based out of Portland, Oregon. He has a passion for creating and building, be the medium glass, sound or code. He enjoys gardening, spending time with his wife and friends and his cats. Sometimes he can be found on the golf course chasing a little white ball.</p>   
                <a className='about-links' href="https://www.linkedin.com/in/greg-mall-3032771b1/">LinkedIn</a>
                <a className='about-links' href="https://github.com/gregmall">Github</a>
                </div>
                    <h2 className='dev-name' >Jerud Moyer</h2>
                <div className='dev-box'>
                    <p>Dad, husband, musician, techie, and many other yadda-yaddas to boot! Jerud loves to plan and cook meals for his family.</p>
                    <a className='about-links' href="https://www.linkedin.com/in/jerud-moyer/">LinkedIn</a>
                    <a className='about-links' href="https://github.com/Jerud-Moyer">Github</a>
                    
                </div>
            </div>
        )
    }
}
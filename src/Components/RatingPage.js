import React from "react";
import ReactStars from "react-rating-stars-component";
import emailjs from 'emailjs-com';
import { useAuth0 } from '@auth0/auth0-react'


const rate = {
    size: 40,
    count: 5,
    color: "grey",
    activeColor: "#FFFF00",
    value: 5,
    a11y: true,
    isHalf: true,
    emptyIcon: <i className="far fa-star" />,
    halfIcon: <i className="fa fa-star-half-alt" />,
    filledIcon: <i className="fa fa-star" />,
    onChange: newValue => {
        rate.value = newValue
        document.getElementById('starsAmount').value = newValue;
    }
};


export default function RatingPage() {
    const { user } = useAuth0();
    function submitClicked(e) {
      
        alert('!המשוב נשלח בהצלחה, תודה ששיתפת אותנו');
        e.preventDefault();
        emailjs.sendForm('service_7obr0rb', 'template_buaygzn', e.target, 'user_XWmV1KnSpmOMzpnNe7bwK')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
        e.target.reset();
    }

    return (
        <div>
            <h1>דרג אותנו</h1>
            <p>נשמח לשמוע את דעתך</p>
            <div className="rating">
                <ReactStars {...rate} />
            </div>
            <form onSubmit={submitClicked}>
                <input type="text" id="starsAmount" defaultValue={rate.value} hidden name="starsAmount" />
                <input type="text" id="starsAmount" defaultValue={user.email} hidden name="userEmail" />
                <textarea type="text" id="textarea" placeholder="חובה למלא שדה זה כדי לשלוח את המשוב" name="message" required/>
                <input className="ratingSubmit blueButton" type="submit" value="שלח" />
            </form>
        </div>
    )

}
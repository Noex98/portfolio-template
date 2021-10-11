import __ENV from "../env.js"

export default function Form(){

    window.sendMail = () => {
        let form = document.querySelector('#formContainer form')

        let email = form.querySelector('#email').value
        let subject = form.querySelector('#subject').value
        let text = form.querySelector('#text').value

        if (email.length < 5) {
            alert('Please write an email')
            return
        } else if (subject.length === 0){
            alert('Please write a subject')
            return
        } else if (text.length === 0){
            alert('Please write a message')
            return
        }

        let mail = {
            email: email,
            subject: subject,
            text: text,
        }

        fetch( __ENV + '/api/mail', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(mail)
        })
            .then(res => res.json())
            .then(data => {
                console.log(1)
                if (data.succes === true){
                    alert('Mail sent')
                } else {
                    alert('An error occured')
                }
            })
    }

    return (/*html*/`
        <div id="formContainer">
            <form>
                <div class="form__textInput">
                    <input required type="email" name="email" id="email" placeholder="E-mail *"/>
                    <input required type="text" name="subject" id="subject" placeholder="subject *"/>
                    <textarea style="resize: none;" required type="text" name="text" id="text" placeholder="Your message *"></textarea>
                </div>
                <input type="button" value="send" onclick="sendMail()" />
            </form>
        </div>
    `)
}
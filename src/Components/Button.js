import React from "react";

export default function Button() {
    const [memeImg, setMemeImg] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg"
    });



    const [allMemeImages, setAllMemeImages] = React.useState([]);

    React.useEffect(
        () => {
            fetch("https://api.imgflip.com/get_memes")
            .then((res) => res.json())
            .then(data => setAllMemeImages(data.data.memes))
        }, []
    )

    function getMemeImg() {
        const rand = Math.floor(Math.random() * allMemeImages.length);
        const url = allMemeImages[rand].url;

        setMemeImg(prevImg => ({
            ...prevImg,
            randomImage: url
        }));
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setMemeImg(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    return (
        <div>
            <form className="">
                <input
                    onChange={handleChange}
                    value={memeImg.topText}
                    name="topText"
                    type="text"
                    placeholder="Top text"
                    className="form--input"
                />
                <input
                    onChange={handleChange}
                    value={memeImg.bottomText}
                    name="bottomText"
                    type="text"
                    placeholder="Bottom text"
                    className="form--input"
                />
            </form>
            <button onClick={getMemeImg}>
                Get a new meme image 🖼
            </button>
            <div className="meme">
                <img src={memeImg.randomImage} className="meme--image" alt="Meme" />
                <h2 className="meme--text top">{memeImg.topText}</h2>
                <h2 className="meme--text bottom">{memeImg.bottomText}</h2>
            </div>
            <button>
                Save Image
            </button>
        </div>
    );
}

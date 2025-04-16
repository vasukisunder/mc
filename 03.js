document.addEventListener('DOMContentLoaded', () => {
    // Text content arrays for each box
    const textContents = {
        text1: [
            "With equal steps, like oxen going yoked,",
            "I went along beside that burdened soul,",
            "as long as my dear Pedagogue allowed;",
            "but when he said: \"Leave him, and go thou on;",
            "for here 't is well that each should urge his bark",
            "with sail and oars, as much as e'er he can,\"",
            "I straightened me as much as walking called for,",
            "although my thoughts kept humble and depressed.",
            "On had I moved, and in my Teacher's steps",
            "was following willingly, and both of us",
            "were showing now how light of step we were,",
            "when \"Downward turn thine eyes!\" he said to me,",
            "\"Well will it be, to calm thee on thy way,",
            "that thou shouldst see the bed thy soles are treading.\""
        ],
        text2: [
            "This last request, dear Lord, is not, indeed,",
            "made for ourselves, who need not make it here,",
            "but is for their sake who behind us stayed.\"",
            "Thus praying good speed for themselves and us,",
            "those shades beneath a burden went their way,",
            "not unlike that whereof one dreams at times,",
            "unequally tormented, all of them,",
            "and weary, o'er the first ring, round and round,",
            "purging away the world's defiling mists.",
            "If good things there be always said for us,",
            "what can be said and done on their behalf",
            "down here, by those whose will is rooted well?",
            "Surely one ought to help them wash away",
            "the stains they brought with them, that they may issue,",
            "cleansed and unburdened, to the starry spheres.",
            "\"Pray, so may pity and Justice speedily unburden you,",
            "that ye may move your wings, and raise yourselves",
            "according to your wish, show us on which hand",
            "lies the shortest way to reach the stairs;"
        ],
        text3: [
            "It showed, moreover, that hard pavement did,",
            "how costly once Alcmaeon caused his mother's",
            "unlucky ornament to seem to her.",
            "It showed how, in the temple's walls, his sons",
            "cast themselves on Sennacherib, and how,",
            "when he was dead, they there abandoned him.",
            "It showed the slaughter and the cruel woe",
            "wrought by Tomyris, when she said to Cyrus:",
            "\"With blood I fill thee, that didst thirst for blood!\"",
            "It showed, too, how the Assyrians took to flight,",
            "routed, when Holophernes had been killed,",
            "and also what was of that slaughter left.",
            "I saw proud Troy in ashes and in caves.",
            "O Ilion, how degraded and how vile",
            "it showed thou wast, the image there perceived!",
            "What master, or of brush or graving-tool,",
            "could reproduce the shadows and the features,",
            "which there would cause all cultured minds to wonder?",
            "The dead seemed dead, the living seemed alive;"
        ],
        text4: [
            "when he who always walked attentively ahead of me, began:",
            "\"Lift up thy head! The time for going thus absorbed is passed.",
            "See there an Angel who is making ready to come toward us;",
            "see how the sixth handmaiden returns now from the service of the day.",
            "With reverence adorn thine acts and face,",
            "that he may now be pleased to send us up;",
            "think that this day will never dawn again!\"",
            "So well accustomed was I to his warning,",
            "that I should never let my time be lost,",
            "that on this theme he could not darkly speak.",
            "Toward us the lovely Creature was advancing,",
            "arrayed in white, and in his countenance,",
            "such as, when trembling, seems the morning star.",
            "His arms he opened, then he oped his wings,",
            "and said to us: \"Come; near by are the steps,",
            "and going up is easy after this.\"",
            "Only a few to this announcement come.",
            "O human race, why, born for upward flight,",
            "fallest thou so before a little wind?",
            "He led us on to where the rock was cut;"
        ],
        text5: [
            "the slope's bold flight is broken by the stairs constructed in an age,",
            "when quire and stave were safe; so, likewise, doth the bank relax,",
            "which from the next ledge here quite steeply falls;",
            "but closely on each side the high rock rubs.",
            "While, turning thither, we were on our way,",
            "\"Blest are the poor in spirit!\" voices sang",
            "in such a way as words could not describe.",
            "Alas! how different are the passes here from those in Hell!",
            "For one up here goes in with songs, but there below with frightful wails!",
            "We now were climbing up the holy stairs,",
            "and lighter far I felt than formerly I seemed to be,",
            "when on the level ground; I hence said:",
            "\"Teacher, say, what heavy thing has been removed from me,",
            "that, as I walk, I almost feel no weariness at all?\"",
            "He answered: \"When the P's, which still remain almost extinct upon thy brow,",
            "are quite erased, as one is now, thy feet will so be conquered by good will,",
            "that they will feel not only no fatigue,",
            "but it will be a pleasure to them to be upward urged.\"",
            "I then did as do those, who go about with something on their head",
            "they know not of, till others' gestures cause them to suspect;"
        ],
        text6: [
            "We now were at the summit of the stairs,",
            "where for the second time is cut away the Mount,",
            "ascent of which frees one from sin;",
            "and there a cornice, like the first one,",
            "girds the hillside round about, save that its arc more quickly curves.",
            "There is no shaded carving apparent here,",
            "nor is there any mark; the bank seems bare,",
            "as also seems the path, with but the livid color of the rock.",
            "\"If we await folk here, of whom to ask our way,\"",
            "the Poet argued, \"I 'm afraid our choice will be,",
            "perhaps, delayed too long.\"",
            "Then on the sun he fixed his steadfast eyes,",
            "made of his right the center for his motion,",
            "and turned the left side of himself around.",
            "\"O thou sweet light, with confidence in whom I enter this new path,",
            "conduct us thou,\" he said, \"as one should be conducted here.",
            "Thou warm'st the world, and on it thou dost shine;",
            "if aught else urge not to the contrary,",
            "thy rays at all times ought to be our guides.\""
        ],
        text7: [
            "Already had we gone as far up there,",
            "as here on earth is reckoned for a mile,",
            "in little time, because of ready will;",
            "when, flying toward us, there were spirits heard,",
            "who, though unseen, were to the board of love",
            "uttering their courteous calls.",
            "The voice which first passed flying, said aloud:",
            "\"They have no wine!\" and then behind us kept repeating it;",
            "and ere, because of having moved away,",
            "it could be heard no more, another, passing, cried:",
            "\"I 'm Orestes!\" nor did that one linger.",
            "\"What are these voices, Father?\" said I then;",
            "and ev'n while I was asking, lo, a third,",
            "which said: \"Love those, from whom ye've ill received!\"",
            "The kindly Teacher then: \"This circle whips the fault of envy,",
            "hence the scourge's cords are drawn from love.",
            "The curb will probably give forth a sound the contrary of this;",
            "in my opinion, I believe thou 'lt hear it,",
            "before the pass of pardon thou attain.",
            "But keenly through the air address thy gaze,",
            "and thou 'lt see people on ahead of us,",
            "who seated are, and each against the cliff.\"",
            "Then wider than before I oped mine eyes;",
            "I looked ahead, and shades I saw with cloaks",
            "not differing from the color of the stone."
        ],
        text8: [
            "And when a little further on we were,",
            "I heard one crying: \"Mary, pray for us!\"",
            "and cries to Michael, Peter, and all the Saints.",
            "Nor do I think there walks on earth to-day",
            "a man so hard, that he would not be pierced",
            "by sympathy for what I then perceived;",
            "for, after I had drawn so near to them,",
            "that what they did with clearness came to me,",
            "tears from my eyes were drawn by bitter grief.",
            "Covered they seemed to me with coarse hair-cloth,",
            "and one sustained the other with his shoulder,",
            "while all of them were by the bank sustained.",
            "Ev'n thus the blind, in want of livelihood,",
            "at Pardons stand to beg for what they need,",
            "and one upon the other bows his head,",
            "that pity may be speedily aroused,",
            "not merely by the sound of what they say,",
            "but by their aspect, which no less implores.",
            "And as the sun availeth not the blind,",
            "so to the shades, whereof I spoke just now,",
            "the sky's light willeth not to grant itself;",
            "because an iron band runs through, and sews",
            "the eyelids of them all, as with wild hawks",
            "one does, since otherwise they 'd not keep still.",
            "To me it seemed an outrage that, unseen,",
            "I should see others, as I walked along;",
            "I therefore turned to my wise Counselor."
        ],
        text9: [
            "It keeps on falling; and the more it swells,",
            "the more that cursèd and unlucky ditch finds",
            "that the dogs are turning into wolves.",
            "Descending then through many a gloomy gorge,",
            "foxes it finds, so full of fraud,",
            "that naught have they to fear, lest cunning master them.",
            "Nor shall I cease to speak, though overheard;",
            "and for this man 't were well, if he recall",
            "hereafter what a truthful spirit shows me.",
            "Thy grandson I behold, who first becomes",
            "a hunter of those wolves upon the banks",
            "of that fierce stream, and terrifies them all.",
            "He sells their flesh, while still alive;",
            "then kills them, as an old beast he would;",
            "of life depriving many, himself of honor he deprives.",
            "He issues bloody from the dismal wood,",
            "and leaves it such, that in a thousand years",
            "'t will not rewood itself as once it was.\"",
            "As at the announcement of some painful loss,",
            "the face of him who listens is disturbed,",
            "from wheresoë'er the danger may assail him;"
        ]
    };

    // Video sources
    const videoSources = [
        "assets/church/1.MOV",
        "assets/church/2.MOV",
        "assets/church/4.MOV",
        "assets/church/5.MOV",
        "assets/church/6.MOV",
        "assets/church/7.MOV",
    ];

    // Consistent interval for all text boxes (in milliseconds)
    const TEXT_UPDATE_INTERVAL = 1000;
    
    // Elements
    const textElements = {};
    for (let id in textContents) {
        textElements[id] = document.getElementById(id);
    }

    // Update text with random selection
    function updateText(id) {
        const textArray = textContents[id];
        const randomIndex = Math.floor(Math.random() * textArray.length);
        textElements[id].textContent = textArray[randomIndex];
        
        // Add fade-in effect
        textElements[id].style.opacity = 0;
        setTimeout(() => {
            textElements[id].style.opacity = 1;
        }, 50);
    }

    // Intervals storage
    const intervals = {};

    // Add transition effect to all boxes
    const allBoxes = document.querySelectorAll('.grid-item');
    
    // Map each box to a specific text content
    const boxToTextMap = {};
    
    // Initialize the mapping
    allBoxes.forEach((box, index) => {
        // Use modulo to cycle through text contents if there are more boxes than text arrays
        const textKey = 'text' + ((index % Object.keys(textContents).length) + 1);
        boxToTextMap[index] = textKey;
        box.setAttribute('data-box-index', index);
        box.style.transition = 'opacity 0.5s ease-in-out';
    });

    // Function to convert a grid item to a video box
    function convertToVideoBox(box) {
        // Clear intervals for this text box if it exists
        if (box.id && intervals[box.id]) {
            clearInterval(intervals[box.id]);
        }
        
        // Save the class list (wide, tall, etc.)
        const classList = box.className.split(' ').filter(cls => 
            cls !== 'grid-item' && cls !== 'video-box' && cls !== 'text-box');
        
        // Clear the box
        box.innerHTML = '';
        
        // Update classes
        box.className = 'grid-item video-box';
        classList.forEach(cls => box.classList.add(cls));
        
        // Remove ID but keep the data-box-index attribute
        box.removeAttribute('id');
        
        // Create video element
        const video = document.createElement('video');
        video.muted = true;
        video.loop = true;
        video.preload = 'auto';
        video.playsinline = true; // Add playsinline attribute for iOS
        video.setAttribute('playsinline', ''); // Ensure it works on all browsers
        video.setAttribute('webkit-playsinline', ''); // For older iOS
        
        // Select random video source
        const randomSource = videoSources[Math.floor(Math.random() * videoSources.length)];
        video.src = randomSource;
        
        // Add to box
        box.appendChild(video);
        
        // Start playing
        const playPromise = video.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                // Playback started successfully
            })
            .catch(e => {
                console.log("Video play error:", e);
                // Create a play button overlay if it doesn't exist
                if (!document.getElementById('play-overlay')) {
                    const playOverlay = document.createElement('div');
                    playOverlay.id = 'play-overlay';
                    playOverlay.innerHTML = '⏯️';
                    playOverlay.style.position = 'fixed';
                    playOverlay.style.top = '50%';
                    playOverlay.style.left = '50%';
                    playOverlay.style.transform = 'translate(-50%, -50%)';
                    playOverlay.style.fontSize = '3rem';
                    playOverlay.style.color = 'white';
                    playOverlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
                    playOverlay.style.padding = '1rem';
                    playOverlay.style.borderRadius = '50%';
                    playOverlay.style.cursor = 'pointer';
                    playOverlay.style.zIndex = '1001';
                    
                    // Add click event to play videos
                    playOverlay.addEventListener('click', () => {
                        document.querySelectorAll('video').forEach(v => {
                            v.play().catch(() => {}); // Enable playback on all videos
                        });
                        playOverlay.remove(); // Remove overlay after click
                    });
                    
                    document.body.appendChild(playOverlay);
                }
            });
        }
    }

    // Function to convert text box to video box
    function convertToTextBox(box) {
        // Clear intervals for this text box if it exists
        if (box.id && intervals[box.id]) {
            clearInterval(intervals[box.id]);
        }
        
        // Save the class list (wide, tall, etc.)
        const classList = box.className.split(' ').filter(cls => 
            cls !== 'grid-item' && cls !== 'video-box' && cls !== 'text-box');
        
        // Clear the box
        box.innerHTML = '';
        
        // Update classes
        box.className = 'grid-item text-box';
        classList.forEach(cls => box.classList.add(cls));
        
        // Set ID for current display (not for permanent mapping)
        const displayId = 'display-' + box.getAttribute('data-box-index');
        box.id = displayId;
        
        // Get the text content for this box
        const textKey = boxToTextMap[box.getAttribute('data-box-index')];
        const textArray = textContents[textKey];
        const randomText = textArray[Math.floor(Math.random() * textArray.length)];
        box.textContent = randomText;
        
        // Store in elements for updates
        textElements[displayId] = box;
        
        // Set interval for text updates from the mapped text content
        intervals[displayId] = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * textArray.length);
            box.textContent = textArray[randomIndex];
        }, TEXT_UPDATE_INTERVAL);
    }

    // Add click event listener to all grid items
    allBoxes.forEach(box => {
        box.addEventListener('click', () => {
            if (box.classList.contains('video-box')) {
                convertToTextBox(box);
            } else if (box.classList.contains('text-box')) {
                convertToVideoBox(box);
            }
        });
    });
    
    // Initialize ALL boxes as video boxes on page load
    document.querySelectorAll('.grid-item').forEach(box => {
        // Force all boxes to be video boxes, even if they were already
        // This ensures consistent video paths and formatting
        convertToVideoBox(box);
    });
}); 
document.addEventListener('DOMContentLoaded', () => {
    const purgatorioVerses = [
        {
            text: "With equal steps, like oxen going yoked, I went along beside that burdened soul, as long as my dear Pedagogue allowed.",
            title: "Canto X"
        },
        {
            text: "\"Downward turn thine eyes!\" he said to me, \"Well will it be, to calm thee on thy way, that thou shouldst see the bed thy soles are treading.\"",
            title: "Canto XII"
        },
        {
            text: "This last request, dear Lord, is not, indeed, made for ourselves, who need not make it here, but is for their sake who behind us stayed.",
            title: "Canto XI"
        },
        {
            text: "It showed, moreover, that hard pavement did, how costly once Alcmaeon caused his mother's unlucky ornament to seem to her.",
            title: "Canto XII"
        },
        {
            text: "I saw proud Troy in ashes and in caves. O Ilion, how degraded and how vile it showed thou wast, the image there perceived!",
            title: "Canto XII"
        },
        {
            text: "Lift up thy head! The time for going thus absorbed is passed. See there an Angel who is making ready to come toward us.",
            title: "Canto XII"
        },
        {
            text: "His arms he opened, then he oped his wings, and said to us: \"Come; near by are the steps, and going up is easy after this.\"",
            title: "Canto XII"
        },
        {
            text: "Alas! how different are the passes here from those in Hell! For one up here goes in with songs, but there below with frightful wails!",
            title: "Canto XII"
        },
        {
            text: "We now were at the summit of the stairs, where for the second time is cut away the Mount, ascent of which frees one from sin.",
            title: "Canto XIII"
        },
        {
            text: "The voice which first passed flying, said aloud: \"They have no wine!\" and then behind us kept repeating it.",
            title: "Canto XIII"
        },
        {
            text: "\"What are these voices, Father?\" said I then; and ev'n while I was asking, lo, a third, which said: \"Love those, from whom ye've ill received!\"",
            title: "Canto XIII"
        },
        {
            text: "Nor do I think there walks on earth to-day a man so hard, that he would not be pierced by sympathy for what I then perceived.",
            title: "Canto XIII"
        }
    ];
    
    // Setup popup links functionality
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('popup-link')) {
            e.preventDefault();
            
            let continueShowing = true;
            let currentVerseIndex = 0;
            
            // Keep showing verses until user cancels
            while (continueShowing) {
                // Get the next verse in sequence
                const verse = purgatorioVerses[currentVerseIndex];
                
                // Show the verse in a confirm dialog and continue only if user clicks OK
                continueShowing = confirm(verse.title + ":\n\n" + verse.text);
                
                if (continueShowing) {
                    // Move to the next verse
                    currentVerseIndex = (currentVerseIndex + 1) % purgatorioVerses.length;
                }
            }
        }
    });
}); 
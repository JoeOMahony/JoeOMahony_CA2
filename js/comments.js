// EXCLUSIVELY USED BY about-us.html TO IMPLEMENT THE COMMENTS SECTION (ONLY)
document.addEventListener('DOMContentLoaded', () => {
    let comments = [];    // A02 spec => "comments must be stored in an array of JSON Objects"

    // Comments display is the div in about-us.html where the comments will be displayed
    const commentsDisplay = document.getElementById('commentsDisplay');
    const rawTemplate = document.getElementById('commentTemplate').innerHTML;
    let compiledTemplate = Handlebars.compile(rawTemplate);

    // Displays the comments from the formatted array in about-us
    const renderComments = () => {
        // Basic sort with the most recent first
        comments.sort((a, b) => b.timestamp - a.timestamp);

        // new array for comments that are formatted and ready to display
        const commentsForView = [];

        // not going to use the original comments array because the built-in timestamp doesn't look great. Only change.
        for (const comment of comments) {
            // TIME FORMAT ADAPTED FROM data-manipulation.js as this uses the exact same format
            let date = new Date(comment.timestamp); // using built-in timestamp
            let weekday = date.toLocaleDateString('en-ie', { weekday: 'long' });
            let day = date.getDate(); // day is date, weekday is 'Friday' or 'Monday' etc.
            let month = date.toLocaleDateString('en-ie', { month: 'long' });
            let year = date.toLocaleDateString('en-ie', { year: 'numeric' });
            let time = date.toLocaleTimeString('en-ie',
                { hour: '2-digit', minute: '2-digit', hour12: false });

            const formattedDateTime = `${weekday} ${day} ${month} ${year} @ ${time}`;

            // This is the formatted JSON object for Handlebars
            const commentViewObject = {
                name: comment.name, // same as original
                text: comment.text, // same as original
                displayDate: formattedDateTime // changed from built-in
            };

            commentsForView.push(commentViewObject); // formatted JSON object passed to array of ready-to-view comments
        }

        let commentsDataDisplay = {
            comments: commentsForView
        };
        commentsDisplay.innerHTML = compiledTemplate(commentsDataDisplay);
    };

    // The following must be implemented after renderComments() as it's not hoisted.
    const commentForm = document.getElementById('commentForm');
    let nameInput = document.getElementById('nameInput');
    let commentInput = document.getElementById('commentInput');

    commentForm.addEventListener('submit', (event) => {
        event.preventDefault(); // no reload

        let name = nameInput.value.trim();
        let text = commentInput.value.trim();

        comments.push({
            name: name,
            text: text,
            timestamp: Date.now() // using built-in here, I'll format later.
        }); // push JSON object to comments array (of originals w/o format)

        renderComments(); // render again to show new comment

        // clear the form after submit code run to allow for another comment, not going to bother putting a clear
        // button. Required by assignment spec
        nameInput.value = '';
        commentInput.value = '';
    });

    renderComments(); // First load, won't show anything but this is handled in Handelbars using if w/ comments length
}); // DOM CONTENT LOADED END
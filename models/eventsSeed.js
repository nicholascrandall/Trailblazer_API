module.exports = [
    {
        name: "Yosemite Valley Hiking",
        lat:  37.865101,
        long: -119.538330,
        city: "Yosemite National Park",
        state: "CA",
        date: '2021-05-03',
        creator: "Nicholas", 
        maxAttendees: 15,
        attendees: ["Josh", "Amanda", "Adam"], 
        details:{
            difficulty: 3, 
            activityType: "Hiking",
            supplies: ["Lunch", "Water"],
            description: "Hey guys it's Nick.  On May 5th (Wednesday), I'm gonna go hiking in the Yosemite Valley. Beginners are welcome but prepare for a long day, bring lunch."
        },
        img: "https://www.nps.gov/yose/planyourvisit/images/hiker-in-valleyweb.jpg?maxwidth=1200&maxheight=1200&autorotate=false",
        comments: ["I've always wanted to go to Yosemite", "This is a great idea!", "I hope it doesn't rain"],
    },
    {
        name: "Haleakala Shuttle Mountain Biking",
        lat:   20.701283,
        long: -156.173325,
        city: "Makawao",
        state: "HI",
        date: new Date('April 28, 2021 16:30:00'),
        creator: "Ellyn", 
        maxAttendees: 10,
        attendees: ["Bob", "Sarah", "Julia"], 
        details:{
            difficulty: 4, 
            activityType: "Mountain Biking",
            supplies: ["Bike", "Water", "Snacks"],
            description: "Hi everyone, I'm gonna be hosting a Mountain Biking event at Haleakala National Park in Hawaii on Wednesday April 28th. Hope everyone can make it!"
        },
        img: "https://cdn2.apstatic.com/photos/mtb/5079795_medium_1554329691.jpg",
        comments: ["Haven't been biking since covid :(", "Looks beautiful!"],
    },
    {
        name: "Greenburgh Nature Center",
        lat:  37.865101,
        long: -119.538330,
        city: "Scarsdale",
        state: "NY",
        date: new Date('May 01, 2921 14:00:00'),
        creator: "Jazmyne", 
        maxAttendees: 5,
        attendees: [],
        details:{
            difficulty: 1, 
            activityType: "Walking",
            supplies: ["Water", "Snacks"],
            description: "Hi, on May 1st I'll be taking a short walk through the Greenburgh Nature Center woodland trail. Super easy, all are welcome."
        },
        img: "https://redtri.com/wp-content/uploads/2014/08/greenburgh-nature-center-fall1.jpg",
        comments: ["An easy walk in the afternoon sounds perfect!"],
    }
]
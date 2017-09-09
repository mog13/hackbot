module.exports = {
    greeting: ["hey", "hello", "howdy", "hey there", "yo"],
    introSelf:["im hackbot", "my name is hackbot", "its hackbot", "hackbots the name"],
    fullIntro:["{{greeting introSelf}}."],
    interest:{
        thank:["thanks", "cheers","great news"],
        registered:["your interest has been registered", "you have been signed up", "you have been added to the list", "amd welcome to the hackathon"]
    },
    ideas:{
      byPerson:["has had an idea", "has come up with something", "has thought of something interesting", "would like to make", "thinks this will be good",
          "wants to hack", "has dreams of", "would like to see", "thinks this might be the next best thing after sliced bread", "likes the idea of", "suggests",
          "suggested", "wrote", "submitted", "has a winner", "thinks they're onto something with", "thinks the world needs"],
        byAnon:["here's an idea", "what about this", "here's one for you", "you might like this", "You could try this", "this could be a good idea", "i suggest",
        "why not try","what do you think of", "imagine if someone built this"],
        notes:["more info", "here's a bit more about it", "here's some extra info", "and a bit more info", "a bit more about it", "in depth", "to go into detail",
        "heres some extra details"]
    },
    tech:{
        extra:["{{ideas.notes}}"],
        intro:["Check out", "This looks cool", "This might help", "This looks good", "How about trying", "Have you seen", "Why not give this a go?",
        "Have you heard about this", "Have you seen this", "Check this out!", "This seems exciting", "Give this a go", "I wish morgan had used this when he built me",
        "Wow look at this!", "This could be interesting"]
    }
};
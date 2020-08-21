# Checkers

This is a project I was working on in some downtime to refresh my react knowledge. I did some react for a while and then set it aside, so I wanted a project to brush up on it. Also, I had previously used redux-thunk and wanted to try out redux-saga.

## Arch

This is a django-rest-framework powered API with a react/redux/saga frontend.

The API isn't really well designed, or even designed. It just exposes a few endpoints for moving pieces around.

The checkers backend is a weird hack based what I thought would be an easy way to store a board, which makes for a very messy library. It's fun though because it exposes some command line tools for playing around with the library.

The frontend is a fun little react page using redux as the store. I'd used redux briefly but this gave me a good platform for messing with redux and redux-saga. I'm probably doing it wrong!

## Roadmap

There are a few places I want to go with this. Remember, it's only partly about checkers (which is actually an interesting problem) but also about the technology involved.

### Django channels/websockets

Since this is a single page react app, I want to be able to send notifications (maybe chat in the future) over a websocket. Currently there's a janky button that lets you refresh the page, so I guess (once we support another player...) you can just sit around refreshing the game and hoping for a move. Don't count on it since there's no other player...

### AI Opponent

So... I want to be able to actually play games. Since I already have a mechanism for listing moves, it seems straightforward to do a random AI that just picks a random move... But I don't actually have a second player system yet, and since you can move all the pieces with a single logged in user (bug) it makes it really easy to test. So this'll happen, but not yet.

### Smart AI Opponent

I might leave this one to someone smarter than me. Suffice to say, with the API I can write a simple bot outline and then have someone build me a player. Or maybe I'll get into machine learning myself.

### Docker

Launch with Docker Compose

### Tests

Well, ya know...

## Known Issues

In a lot of ways, this project is really messy. The checkers backend I hacked together I think when I was sick, and therefore high on cold medicine. If I were to redo it (I might redo it) I would probably put it on an x,y grid (hello, checkerboard!) instead of the weird 1d array/adjacency matrix that I built it around. That said, this was a fun approach for various reasons.

Other, more boring issues:

 - Not everything related to moving pieces is error checked
 - The project isn't actually finished, so many things are left undone. This includes things like
    - Having an AI backend
    - Having another player
    - The system actually recognizing a win...

Nothing very important, after all. ;)


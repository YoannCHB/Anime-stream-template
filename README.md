# Anime-stream-template
Free website for anime streaming
- [x] for firebase
- [x] all platform
- [x] full english version
- [x] work with kitsu.io api
------------------------------
# SETUP:
Edit config.js with your firebase config and that's all
```js
const firebaseConfig = {
    apiKey: null,
    authDomain: null,
    databaseURL: null,
    projectId: null,
    storageBucket: null,
    messagingSenderId: null,
    appId: null,
    measurementId: null
};
```
DATABASE FORM:
```json
{
  "Anime name": {
    "embed": ["link iframe ep 1", "link iframe ep 2", ...]
  }
}
```
Example:
```json
{
  "Beelzebub " : {
    "embed" : ["https://www.pstream.net/e/d8x68w1oyWzR35M", "https://www.pstream.net/e/J3VgnkL0JVD8q2D", "https://www.pstream.net/e/27kD1B3AER3vq1K", "https://www.pstream.net/e/JXrgQX71Bdr5oyQ", "https://www.pstream.net/e/29ne1B3AEd3vGql", "https://www.pstream.net/e/GBVgYMDoeVEgqn2", "https://www.pstream.net/e/LreDoBoZBbZ2VBk", "https://www.pstream.net/e/ZjWg1B3AEm38KNp", "https://www.pstream.net/e/nd7g0YE1Zq2KWQj", "https://www.pstream.net/e/VN19xKgYK6XDxGP", "https://www.pstream.net/e/aPd80YEwP0PN4wx", "https://www.pstream.net/e/5OLxbGa25QK8rlM", "https://www.pstream.net/e/dVj8Ll7Yjj38qEm", "https://www.pstream.net/e/4g6xKy7a44aNlbW", "https://www.pstream.net/e/RD5KoBo4jjrvkGA", "https://www.pstream.net/e/Vv12A17NaaX27Y6", "https://www.pstream.net/e/Zl7emALJAEQeOa0", "https://www.pstream.net/e/lnZvOyR9yXQKNYX", "https://www.pstream.net/e/g2G8Ll7wlQ38mlv", "https://www.pstream.net/e/7WJ8mAoY00L80rX", "https://www.pstream.net/e/2dN8dn0MZr4Jb9n"]
  },
  "Black Clover " : {
    "embed" : ["https://www.pstream.net/e/XrVaERbWkEzgp71"]
  },
  "Boku no Hero Academia 4th Season " : {
    "embed" : ["https://www.pstream.net/e/voBz9B96X5ye8V9", "https://www.pstream.net/e/RaE47KgbKe14Y81", "https://www.pstream.net/e/w3Xyj5jeqwLzg5q", "https://www.pstream.net/e/ZMXOAbJk7dvEoeP", "https://www.pstream.net/e/90Yb1kp8ZA5EGPx", "https://www.pstream.net/e/l0OY6nO73AqYWRk", "https://embed.mystream.to/3ww8pk9mwuns", "https://embed.mystream.to/g71qdg0osjdy", "https://embed.mystream.to/vmmlo7u4tleb", "https://www.pstream.net/e/OawzbyZ4pyVYkjb", "https://www.pstream.net/e/lxGgv2dX7PkgM2N", "https://embed.mystream.to/rp3xe0a1wun8", "https://www.pstream.net/e/4eD29PJN7BrEYV8", "https://www.pstream.net/e/pzM6OVGlXNLDBAl", "https://www.pstream.net/e/NQJzZVZJR4yzm7b", "https://www.pstream.net/e/z4VrxXA9VpZBQD2", "https://www.pstream.net/e/DgWPaalM7PQ7NVv", "https://www.pstream.net/e/XOAdebQEJD2YMyP", "https://www.pstream.net/e/peRBLwLoBVVnWP4", "https://www.pstream.net/e/KgeMQ68dLG7pA0a", "https://www.pstream.net/e/zmRWg0gNZmjNQxy", "https://www.pstream.net/e/KzoqMApywx4ZvdX", "https://www.pstream.net/e/Xkg4qpk09rnd20X", "https://www.pstream.net/e/gGBYDkjB8wRr1o4", "https://www.pstream.net/e/zpy2M6q66JleM1P" ]
  },
  "Boku no Hero Academia: The Movie " : {
    "embed" : [ "https://www.pstream.net/e/kXLOGeJJwYa7QMy" ]
  }
}
```
--------------------
# SCREEN
```
PHONE AND COMPUTER
```
<img alt="mobile acceuille" src="./screen/Mobile/acceuille.png"/>
<img alt="mobile descrip" src="./screen/Mobile/descrip.png"/>
<img alt="mobile video" src="./screen/Mobile/video.png"/>
<img alt="PC acceuille" src="./screen/PC/accueille.png"/>
<img alt="PC description" src="./screen/PC/description.png"/>
<img alt="PC video" src="./screen/PC/video.png"/>

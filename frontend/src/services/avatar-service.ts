const avatarLinkList = {
  male: [
    "https://i.pinimg.com/originals/af/d1/a3/afd1a3201f501c4edd8d1543051e5063.jpg",
    "https://i.pinimg.com/originals/c8/ea/ad/c8eaad52ac8b443748e153da94e677de.jpg",
    "https://i.pinimg.com/originals/ce/a6/90/cea6904b92ae15ca58d7bd868d2f845d.jpg",
    "https://i.pinimg.com/originals/ba/6b/f8/ba6bf8451d18a38ba4039eaa738e42d9.jpg",
    "https://i.pinimg.com/originals/9f/19/53/9f195319cb0db8d4018c6b2319495283.jpg",
    "https://i.pinimg.com/originals/1a/11/cf/1a11cf9d73af1466b9d76fd38d4c33ab.jpg",
    "https://i.pinimg.com/236x/f7/7b/99/f77b996c19074a27d713ad797cf3694f.jpg",
    "https://i.pinimg.com/originals/ff/ed/56/ffed567c5e67c906a1fd9e0fe3dfb2d7.jpg",
    "https://i.pinimg.com/originals/1d/4e/98/1d4e986be0ec843ea50ef920e5b4f768.jpg",
    "https://i.pinimg.com/236x/c9/27/16/c9271651f6ce5089ab835acd28f9c373.jpg",
    "https://i.pinimg.com/originals/e5/5c/cb/e55ccb8da8820c4e92dc78d8bd94fede.jpg",
    "https://i.pinimg.com/originals/4b/5b/71/4b5b719274cc2fe2352dcfe917e53ab1.png",
    "https://source.unsplash.com/featured/300x300",
    "https://source.unsplash.com/random/?sky",
    "https://source.unsplash.com/random/?sea",
  ],
  female: [
    "https://i.pinimg.com/originals/c9/1f/98/c91f98d278a568b7e66e5df15136d3f5.jpg",
    "https://i.pinimg.com/originals/b2/03/b7/b203b7b9a80a10a97c80e1b1990a21e9.png",
    "https://i.pinimg.com/originals/97/f0/cb/97f0cb0bd91313be32a74ff14584d0f7.jpg",
    "https://i.pinimg.com/originals/f4/a4/84/f4a48410adff9d5982419dc8158838f2.jpg",
    "https://i.pinimg.com/originals/e0/b4/de/e0b4deafeffe36e32eeb85e214b07a9e.jpg",
    "https://xsgames.co/randomusers/avatar.php?g=female",
    "https://source.unsplash.com/featured/300x300",
    "https://source.unsplash.com/random/?sky",
    "https://i.pinimg.com/originals/58/17/fa/5817fa9ae3ae22becb33becfbf63c7fc.jpg",
    "https://i.pinimg.com/236x/71/7e/b8/717eb83029e637495e17be45e95395d9.jpg",
    "https://i.pinimg.com/originals/37/19/66/37196672f577ff996676ec44356f9a06.jpg",
    "https://i.pinimg.com/originals/f9/26/be/f926bef1490ab447798ccd012c2e8040.jpg",
    "https://i.pinimg.com/originals/62/cf/79/62cf79e07aa4b017ab798bc4a3678bfe.jpg",
    "https://i.pinimg.com/originals/64/f8/37/64f837cd7c77b0e335174410ed3ca6f9.jpg",
    "https://i.pinimg.com/originals/e1/45/a5/e145a59550597c46201c1ea6e25fcd6e.jpg",
    "https://i.pinimg.com/originals/62/cf/79/62cf79e07aa4b017ab798bc4a3678bfe.jpg",
    "https://unsplash.com/s/photos/sea",
    "https://source.unsplash.com/random/?pink",
    "https://source.unsplash.com/random/?colorful",
  ],
};
function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

const avatarService = {
  getRandomAvatar(male: boolean) {
    if (male) {
      let index = getRandomInt(avatarLinkList.male.length);
      return avatarLinkList.male[index];
    } else {
      let index = getRandomInt(avatarLinkList.female.length);
      return avatarLinkList.female[index];
    }
  },
};
export default avatarService;

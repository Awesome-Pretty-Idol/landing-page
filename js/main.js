const ApiMembers = [
  "SaeByeok",
  "Dany",
  "CheongEum",
  "HeeJoo",
  "Haru",
];

const ApiMemberInfo = {
  "HeeJoo": {
    "birthName": "전희주",
    "dateOfBirth": "1996.11.30",
    "nationality": "Korean",
  },
  "SaeByeok": {
    "birthName": "심재영",
    "dateOfBirth": "1996.11.09",
    "nationality": "Korean",
  },
  "CheongEum": {
    "birthName": "장청음",
    "dateOfBirth": "1996.06.18",
    "nationality": "Korean",
  },
  "Haru": {
    "birthName": "이유정",
    "dateOfBirth": "1997.02.26",
    "nationality": "Korean",
  },
  "Dany": {
    "birthName": "전은지",
    "dateOfBirth": "1998.01.25",
    "nationality": "Korean",
  }
}

// https://stackoverflow.com/questions/4060004/calculate-age-given-the-birth-date-in-the-format-yyyymmdd
function calculateAge(birthday) {
  const birthDate = new Date(birthday);
  const ageDifferenceMillis = Date.now() - birthDate.getTime();
  const ageDate = new Date(ageDifferenceMillis);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

function createSection(id = "Api", tabIndex = -1) {
  const section = document.createElement("section");
  section.id = id;
  if (tabIndex === 0) {
    section.tabIndex = tabIndex;
  }
  return section;
}

function link(href = "", id = "") {
  const a = document.createElement("a");
  a.href = `#${href}`;
  a.id = id;
  return a;
}

function createTitle(title = "API", href = "Home", id = "ApiTitle") {
  const h2 = document.createElement("h2");
  const h2Link = link(href, id);
  h2Link.innerHTML = title;
  h2.appendChild(h2Link);
  return h2;
}

function createPicture(fileName = "Api") {
  const img = document.createElement("img");
  img.setAttribute("data-src", `./img/webp/${fileName}.webp`);
  img.setAttribute("alt", fileName);
  img.tabIndex = 0;

  // Use .jpg or .png if browser doesn't support .webp images
  img.onerror = () => {
    img.onerror = () => {
      img.onerror = () => {
        console.log(`Error: Could not find image of ${fileName}.`);
      };
      img.src = `./img/png/${fileName}.png`;
    };
    img.src = `./img/jpg/${fileName}.jpg`;
  }

  img.className = "lazyload";
  return img;
}

function createDiv(className = "") {
  const div = document.createElement("div");
  div.className = className;
  return div;
}

function createPictureSide(memberName) {
  const pictureSide = createDiv("picture-side");
  const img = createPicture(memberName);
  pictureSide.appendChild(img);
  return pictureSide;
}

function createSpan(className = "", text = "") {
  const span = document.createElement("span");
  span.className = className;
  span.innerHTML = text;
  return span;
}

function createInfo(memberName, infoList = ApiMemberInfo) {
  const memberInfo = infoList[memberName];
  memberInfo["age"] = calculateAge(memberInfo["dateOfBirth"]);
  const div = createDiv("info");
  for (const info in memberInfo) {
    const p = document.createElement("p");
    const property = createSpan("property");

    // Formatting profile information--thanks, Stack Overflow
    property.innerHTML = info.replace(/([A-Z]+)/g, " $1")
      .replace(/([A-Z][a-z])/g, " $1")
      .replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }) + ": ";

    const value = createSpan("value", memberInfo[info]);
    value.tabIndex = 0;
    p.appendChild(property);
    p.appendChild(value);
    div.appendChild(p);
  }
  return div;
}

function createInfoSide(memberName) {
  const infoSide = createDiv("info-side");
  infoSide.appendChild(createTitle(memberName, "Api", `${memberName}Link${memberName}Title`));
  infoSide.appendChild(createInfo(memberName));
  return infoSide;
}

function createProfile(memberName, swapSides = true) {
  const section = createSection(memberName);
  section.id = memberName;
  section.className += swapSides ? " left" : "";
  const pictureSide = createPictureSide(memberName);
  const infoSide = createInfoSide(memberName);
  if (swapSides) {
    section.appendChild(infoSide);
    section.appendChild(pictureSide);
  } else {
    section.appendChild(pictureSide);
    section.appendChild(infoSide);
  }
  return section;
}

function createProfiles(members = ApiMembers, swapSides = (i) => i % 2 === 1 /* Swap sides every odd number */) {
  const profiles = document.createElement("article");
  for (let i = 0; i < members.length; i++) {
    const profile = createProfile(members[i], swapSides(i));
    profiles.appendChild(profile);
  }
  return profiles;
}

function createNavitationIndexForGroupPictureCaption(members = ApiMembers) {
  const p = document.createElement("p");
  p.className = "ignore";
  for (let i = 0; i < members.length; i++) {
    const memberLink = link(members[i], `${members[i]}Title${members[i]}Link`);
    memberLink.innerHTML = members[i];
    p.appendChild(memberLink);
    if (i < members.length - 1) {
      p.appendChild(document.createTextNode(", "));
    }
  }
  return p;
}

function createSectionApiPicture() {
  const section = createSection("Api", 0);
  section.appendChild(createTitle());
  section.appendChild(createPicture());
  section.appendChild(createNavitationIndexForGroupPictureCaption());
  return section;
}

function createArticleApiProfiles() {
  const profiles = createProfiles();
  profiles.insertBefore(createSectionApiPicture(), profiles.firstChild);
  return profiles;
}

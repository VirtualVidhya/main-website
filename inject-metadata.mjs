import fs from "fs";
import path from "path";
import fastGlob from "fast-glob";
import chalk from "chalk"; // for colored logs

// Define metadata for each page
const metadata = {
  "/": {
    title: "V.Vidhya - Your virtual path to knowledge | Computer Education for All in Surat",
    description: "Learn top computer courses at V.Vidhya in Surat. From programming to graphic design, boost your skills and indulge your creativity to do real work with the help of technology.",
  },

  "/contact": {
    title: "Contact Us - V.Vidhya | For best Computer Education in Surat",
    description: "Get in touch with V.Vidhya for the best computer education in Surat. Visit our institute, call us, or drop a message to learn more about offered courses.",
  },
  "/courses": {
    title: "Explore All Computer Courses at V.Vidhya | From Design to Coding, For Kids to Senior-Citizens",
    description: "Browse our latest courses and start learning asap! Whether you are a kid exploring computers, a young digital artist, a working professional upskilling or a senior-citizen seeking to navigate technology!",
  },
  "/privacy-policy": {
    title: "Privacy Policy - V.Vidhya | Your Data, Our Responsibility",
    description: "Read the privacy policy of V.Vidhya to learn how we handle your data securely and ensure transparency in our computer education services.",
  },
  "/terms-&-conditions": {
    title: "Terms & Conditions - V.Vidhya | Know Our Rules and Regulations",
    description: "Understand the terms & conditions of V.Vidhya. Learn about our policies, course regulations, and usage guidelines for our computer education services.",
  },

  "/courses/multimedia": {
    title: "Explore best Multimedia Courses at V.Vidhya in Surat",
    description: "Learn graphics design, video editing, animation, UI/UX, interior design and more at V.Vidhya. Our multimedia courses in Surat help you master all the latest creative tools.",
  },
  "/courses/programming": {
    title: "Explore top Programming Courses at V.Vidhya in Surat",
    description: "Master coding with our programming courses at V.Vidhya. Learn Game Development, Web Development and all the core programming languages like C/C++, Python, Java in Surat.",
  },
  "/courses/Kids": {
    title: "Explore Computer Courses for Kids at V.Vidhya in Surat",
    description: "Introduce your child to technology with fun and interactive computer courses at V.Vidhya. Learn Scratch Programming, MS Office, and essential digital skills in Surat.",
  },
  "/courses/literacy": {
    title: "Explore essential Computer Literacy Courses at V.Vidhya in Surat",
    description: "Build your digital skills with our computer literacy courses at V.Vidhya. Learn MS Office, Advanced Excel, Accounting, and Digital Marketing in Surat.",
  },

  "/courses/multimedia/graphics-design": {
    title: "Learn Graphics Design at V.Vidhya",
    description: "Kickstart your design career with our graphic design course at V.Vidhya. Learn Photoshop, Illustrator, CorelDRAW & more in Surat.",
  },
  "/courses/multimedia/video-editing": {
    title: "Learn Video Editing at V.Vidhya",
    description: "Learn professional video editing at V.Vidhya in Surat. Master Premiere Pro, After Effects, transitions, effects, and storytelling techniques.",
  },
  "/courses/multimedia/digital-textile-design": {
    title: "Learn Digital Textile Design at V.Vidhya",
    description: "Learn digital textile design at V.Vidhya in Surat. Master fabric patterns, fashion graphics, and print design for the textile industry.",
  },
  "/courses/multimedia/interior-design": {
    title: "Learn Interior Design at V.Vidhya",
    description: "Master interior design at V.Vidhya in Surat. Learn space planning, 3D modeling, and architectural visualization for stunning designs.",
  },
  "/courses/multimedia/ui-ux-design": {
    title: "Learn UI/UX Design at V.Vidhya",
    description: "Become a UI/UX designer at V.Vidhya in Surat. Learn Figma, Adobe XD, wireframing, prototyping, and user experience principles.",
  },
  "/courses/multimedia/jewellery-design": {
    title: "Learn Jewellery Design at V.Vidhya",
    description: "Learn jewellery design at V.Vidhya in Surat. Master CAD software, hand sketching, and rendering techniques for stunning jewellery creations.",
  },
  "/courses/multimedia/photoshop": {
    title: "Learn Adobe Photoshop at V.Vidhya",
    description: "Become a Photoshop expert at V.Vidhya in Surat. Learn image editing, photo retouching, and creative design techniques for professional work.",
  },
  "/courses/multimedia/illustrator": {
    title: "Learn Adobe Illustrator at V.Vidhya",
    description: "Learn Adobe Illustrator at V.Vidhya in Surat. Master vector graphics, logo design, typography, and illustration for creative projects.",
  },
  "/courses/multimedia/after-effects": {
    title: "Learn Adobe After-Effects at V.Vidhya",
    description: "Master motion graphics & visual effects with our After Effects course at V.Vidhya. Learn animation, compositing, and special effects in Surat.",
  },
  "/courses/multimedia/premier-pro": {
    title: "Learn Adobe Premier-Pro at V.Vidhya",
    description: "Learn Adobe Premiere Pro at V.Vidhya in Surat. Master professional video editing, color grading, and cinematic effects for film and social media.",
  },
  "/courses/multimedia/corel-draw": {
    title: "Learn Corel-Draw at V.Vidhya",
    description: "Become a graphic design pro with our CorelDRAW course at V.Vidhya. Learn logo design, vector art, and illustration skills in Surat.",
  },
  "/courses/multimedia/figma": {
    title: "Learn Figma at V.Vidhya",
    description: "Learn UI/UX design with Figma at V.Vidhya in Surat. Master wireframing, prototyping, and user experience design for websites & mobile apps.",
  },

  "/courses/programming/game-development": {
    title: "Learn Game Development at V.Vidhya",
    description: "Learn game development at V.Vidhya in Surat. Master Unity, Unreal Engine, C#, 2D & 3D game mechanics, and game design principles.",
  },
  "/courses/programming/full-stack-webdev": {
    title: "Learn Full-stack Web-Development at V.Vidhya",
    description: "Learn full-stack development at V.Vidhya in Surat. Master front-end, back-end, databases, and deployment for complete web apps.",
  },
  "/courses/programming/front-end-webdev": {
    title: "Learn Front-end Web-Development at V.Vidhya",
    description: "Become a front-end developer at V.Vidhya in Surat. Learn HTML, CSS, JavaScript, React, and responsive web design.",
  },
  "/courses/programming/back-end-webdev": {
    title: "Learn Back-end Web-Development at V.Vidhya",
    description: "Master back-end development at V.Vidhya in Surat. Learn server-side programming, databases, APIs, Node.js, Python, PHP & more.",
  },
  "/courses/programming/fundamentals-of-comp-app": {
    title: "Learn fundamentals of Computer Application at V.Vidhya",
    description: "Learn fundamental computer applications at V.Vidhya in Surat. Covers MS Office, Windows, email, internet, and essential IT skills.",
  },
  "/courses/programming/cpp-programming": {
    title: "Learn C++ Programming at V.Vidhya",
    description: "Master C++ programming at V.Vidhya in Surat. Learn OOP, data structures, STL, game development, and competitive programming.",
  },
  "/courses/programming/c-programming": {
    title: "Learn C Programming at V.Vidhya",
    description: "Learn C programming from scratch at V.Vidhya in Surat. Master functions, loops, data structures, and algorithms for software development.",
  },
  "/courses/programming/python-programming": {
    title: "Learn Python Programming at V.Vidhya",
    description: "Learn Python at V.Vidhya in Surat. Covers programming basics, data science, machine learning, Django, Flask, and automation.",
  },
  "/courses/programming/java-programming": {
    title: "Learn Java Programming at V.Vidhya",
    description: "Master Java programming at V.Vidhya in Surat. Learn OOP, multithreading, JDBC, Spring Boot, and build real-world applications.",
  },

  "/courses/kids/scratch-programming": {
    title: "Learn Scratch Programming at V.Vidhya",
    description: "Let your child explore coding with Scratch at V.Vidhya in Surat. A fun, drag-and-drop way to learn programming and create animations.",
  },
  "/courses/kids/ms-office": {
    title: "Learn MS-Office for kids at V.Vidhya",
    description: "Introduce your child to MS Office at V.Vidhya in Surat. Learn Word, Excel, and PowerPoint with interactive, kid-friendly lessons.",
  },

  "/courses/literacy/dtp": {
    title: "Learn Desktop Publishing (DTP) at V.Vidhya",
    description: "Learn Desktop Publishing at V.Vidhya in Surat. Master Photoshop, CorelDRAW, and InDesign for print & digital media.",
  },
  "/courses/literacy/accounting": {
    title: "Learn Computer Accounting at V.Vidhya",
    description: "Learn accounting software like Tally and gain financial management skills at V.Vidhya in Surat. Ideal for students & professionals.",
  },
  "/courses/literacy/digital-marketing": {
    title: "Learn Digital Marketing at V.Vidhya",
    description: "Get certified in Digital Marketing at V.Vidhya in Surat. Learn SEO, Google Ads, Social Media Marketing, Content Strategy & more.",
  },
  "/courses/literacy/ms-office": {
    title: "Learn MS-Office at V.Vidhya",
    description: "Master MS Office at V.Vidhya in Surat. Hands-on training in Word, Excel, PowerPoint, and essential office skills.",
  },
  "/courses/literacy/adv-excel": {
    title: "Learn Advance Excel at V.Vidhya",
    description: "Master Advanced Excel at V.Vidhya in Surat. Learn formulas, pivot tables, data analysis, and automation with real-world applications.",
  },
};

// Function to inject metadata
async function injectMetadata() {
  const files = await fastGlob("dist/**/*.html"); // Get all HTML files

  console.log(chalk.yellowBright(`# injecting metadata...`));

  files.forEach((file) => {
    let relativePath = file.replace("dist", "").replace(".html", "");

    // Ensure correct paths
    if (relativePath === "/index") relativePath = "/";
    else if (relativePath.endsWith("/index"))
      relativePath = relativePath.replace("/index", "");

    const meta = metadata[relativePath] || {
      title: "Vidhya - Your virtual path to knowledge",
      description: "Computer education for all",
    };

    if (fs.existsSync(file)) {
      let html = fs.readFileSync(file, "utf8");

      // html = html.replace(
      //   /<title>.*<\/title>/,
      //   `<title>${meta.title}</title>`
      // );

      // Inject metadata before `</head>`
      html = html.replace(
        "</head>",
        `
        <title>${meta.title}</title>
        <meta name="description" content="${meta.description}">
        <meta property="og:title" content="${meta.title}">
        <meta property="og:description" content="${meta.description}">
        <meta name="twitter:title" content="${meta.title}">
        <meta name="twitter:description" content="${meta.description}">
        </head>
        `
      );

      fs.writeFileSync(file, html);

      console.log(
        chalk.grey(`metadata injected into:`) + chalk.green(` ${file}, `)
      );
    }
  });

  console.log(
    chalk.white(`✔ `) + chalk.yellowBright(`successfully injected metadata\n\n`)
  );
}

// Run the injection function
injectMetadata();

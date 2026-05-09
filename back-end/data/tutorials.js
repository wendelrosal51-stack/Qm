const tutorials = {
  "ubuntu-installation": {
    id: "ubuntu-installation",
    distro: "Ubuntu",
    title: "Installation",
    icon: "assets/install.png",
    summary: "Prepare an Ubuntu installer safely, understand the ISO file, and create a bootable USB.",
    objectives: [
      "Download the Ubuntu ISO from the official website",
      "Use Rufus to prepare a bootable USB drive",
      "Understand the backup warning before formatting a USB drive"
    ],
    lessons: [
      {
        id: 1,
        title: "Download Ubuntu ISO",
        steps: [
          {
            text: "Open the Ubuntu website and go to the download section.",
            media: "assets/u1.mp4",
            type: "video"
          },
          {
            text: "Choose Ubuntu Desktop so you get the beginner-friendly installer.",
            media: "assets/u2.mp4",
            type: "video"
          },
          {
            text: "Download the latest Ubuntu Desktop ISO and keep it in an easy-to-find folder.",
            media: "assets/u3.mp4",
            type: "video"
          }
        ]
      },
      {
        id: 2,
        title: "Download Rufus",
        steps: [
          {
            text: "Open the Rufus website. Rufus is used to turn the ISO into a bootable USB installer.",
            media: "assets/rufus.gif",
            type: "image"
          },
          {
            text: "Download the latest Rufus release.",
            media: "assets/rufusdl.gif",
            type: "image"
          },
          {
            text: "Run Rufus after it finishes downloading.",
            media: "assets/rufusdld.gif",
            type: "image"
          }
        ]
      },
      {
        id: 3,
        title: "Create a Bootable USB",
        steps: [
          {
            text: "Plug in your USB drive and select it under Device.",
            media: "assets/selectdevice.gif",
            type: "image"
          },
          {
            text: "Choose the Ubuntu ISO, start the process, and confirm ISO Image mode when Rufus asks.",
            media: "assets/startpartition.mp4",
            type: "video",
            warning: "This will delete the files on the USB drive. Back up important files before continuing."
          },
          {
            text: "After Rufus finishes, keep the USB plugged in and restart the computer.",
            media: "assets/restartpc.gif",
            type: "image"
          }
        ]
      }
    ],
    quiz: [
      {
        id: 1,
        question: "What is the purpose of downloading the Ubuntu ISO file?",
        choices: [
          "It contains the Ubuntu installer image",
          "It stores your Windows backup",
          "It updates your web browser",
          "It installs Rufus automatically"
        ],
        answer: 0
      },
      {
        id: 2,
        question: "Why should you back up files before using Rufus on a USB drive?",
        choices: [
          "Rufus can format the USB drive and erase existing files",
          "Ubuntu blocks all USB files by default",
          "The ISO file changes your account password",
          "The browser deletes downloads after installing Ubuntu"
        ],
        answer: 0
      },
      {
        id: 3,
        question: "Which device should be selected in Rufus before starting?",
        choices: [
          "The USB drive you want to turn into an installer",
          "The monitor connected to the computer",
          "The keyboard layout",
          "The Wi-Fi router"
        ],
        answer: 0
      },
      {
        id: 4,
        question: "What should you do after Rufus finishes creating the bootable USB?",
        choices: [
          "Keep the USB plugged in and restart the computer",
          "Delete the Ubuntu ISO immediately",
          "Uninstall the web browser",
          "Format the internal hard drive from Windows"
        ],
        answer: 0
      },
      {
        id: 5,
        question: "Which option is safest for beginners before installing Ubuntu on real hardware?",
        choices: [
          "Try the process in a virtual machine or prepare backups first",
          "Skip backups to save time",
          "Disconnect the display",
          "Install random driver tools first"
        ],
        answer: 0
      }
    ]
  },
  "ubuntu-navigation": {
    id: "ubuntu-navigation",
    distro: "Ubuntu",
    title: "Basic Navigation",
    icon: "assets/features.png",
    summary: "Learn the Ubuntu desktop layout, file manager, settings, and safe daily navigation.",
    objectives: [
      "Recognize the Ubuntu dock, app launcher, and system menu",
      "Use Files to browse common folders",
      "Open Settings and adjust basic preferences"
    ],
    lessons: [
      {
        id: 1,
        title: "Explore the Desktop",
        steps: [
          {
            text: "Use the dock to open frequently used apps and switch between running apps.",
            media: "assets/ubuntu.png",
            type: "image"
          },
          {
            text: "Open Files to find Downloads, Documents, Pictures, and other common folders.",
            media: "assets/home.png",
            type: "image"
          },
          {
            text: "Open Settings from the system menu when you need display, network, or user options.",
            media: "assets/features.png",
            type: "image"
          }
        ]
      }
    ],
    quiz: [
      {
        id: 1,
        question: "Which Ubuntu app is commonly used to browse folders like Downloads and Documents?",
        choices: ["Files", "Rufus", "GRUB", "Terminal only"],
        answer: 0
      },
      {
        id: 2,
        question: "Where would you usually change display or network preferences?",
        choices: ["Settings", "The ISO file", "The bootable USB label", "The browser history"],
        answer: 0
      },
      {
        id: 3,
        question: "What is the dock mainly used for?",
        choices: ["Opening and switching between apps", "Formatting USB drives", "Changing BIOS settings", "Checking quiz answers"],
        answer: 0
      }
    ]
  },
  "ubuntu-commands": {
    id: "ubuntu-commands",
    distro: "Ubuntu",
    title: "Terminal Commands",
    icon: "assets/command.png",
    summary: "Practice beginner terminal commands for moving around, listing files, and managing folders.",
    objectives: [
      "Open the terminal",
      "Use pwd, ls, and cd",
      "Create folders safely with mkdir"
    ],
    lessons: [
      {
        id: 1,
        title: "First Terminal Commands",
        steps: [
          {
            text: "Open Terminal from the app launcher.",
            media: "assets/terminal.gif",
            type: "image"
          },
          {
            text: "Use pwd to show your current folder and ls to list files.",
            command: "pwd\nls"
          },
          {
            text: "Use cd to move into a folder and mkdir to create a new folder.",
            command: "cd Downloads\nmkdir practice-folder"
          }
        ]
      }
    ],
    quiz: [
      {
        id: 1,
        question: "Which command shows the current folder?",
        choices: ["pwd", "mkdir", "apt", "clear-usb"],
        answer: 0
      },
      {
        id: 2,
        question: "Which command lists files in the current folder?",
        choices: ["ls", "cd", "rufus", "iso"],
        answer: 0
      },
      {
        id: 3,
        question: "What does mkdir practice-folder do?",
        choices: ["Creates a folder named practice-folder", "Deletes a folder", "Starts Ubuntu installation", "Changes the password"],
        answer: 0
      }
    ]
  },
  "ubuntu-apps": {
    id: "ubuntu-apps",
    distro: "Ubuntu",
    title: "App Installation",
    icon: "assets/apps.png",
    summary: "Compare terminal and graphical app installation, then install useful beginner apps.",
    objectives: [
      "Understand apt update and apt install",
      "Know when to use Ubuntu Software",
      "Install recommended apps with confidence"
    ],
    lessons: [
      {
        id: 1,
        title: "Install Apps Safely",
        steps: [
          {
            text: "Use Ubuntu Software when you prefer a graphical app store experience.",
            media: "assets/apps.png",
            type: "image"
          },
          {
            text: "Use apt update before installing from the terminal so your package list is current.",
            command: "sudo apt update"
          },
          {
            text: "Install an app with apt install. Replace the app name with the package you need.",
            command: "sudo apt install vlc"
          }
        ]
      }
    ],
    quiz: [
      {
        id: 1,
        question: "Why run sudo apt update before installing packages?",
        choices: ["To refresh the package list", "To delete installed apps", "To open the app store", "To change the wallpaper"],
        answer: 0
      },
      {
        id: 2,
        question: "Which command installs VLC using apt?",
        choices: ["sudo apt install vlc", "sudo apt update vlc", "mkdir vlc", "cd vlc"],
        answer: 0
      },
      {
        id: 3,
        question: "What is Ubuntu Software useful for?",
        choices: ["Installing apps with a graphical interface", "Creating BIOS passwords", "Formatting the internal drive", "Writing quiz questions"],
        answer: 0
      }
    ]
  },
  "ubuntu-troubleshooting": {
    id: "ubuntu-troubleshooting",
    distro: "Ubuntu",
    title: "Troubleshooting",
    icon: "assets/trouble.png",
    summary: "Learn safe first checks for common Ubuntu problems before trying risky fixes.",
    objectives: [
      "Restart and observe error messages",
      "Check network, updates, and drivers",
      "Know when to use recovery mode carefully"
    ],
    lessons: [
      {
        id: 1,
        title: "First Troubleshooting Checks",
        steps: [
          {
            text: "Start with simple checks: restart, reconnect devices, and note any exact error messages.",
            media: "assets/restartpc.gif",
            type: "image"
          },
          {
            text: "For driver or display issues, check Additional Drivers before downloading random tools.",
            media: "assets/trouble.png",
            type: "image"
          },
          {
            text: "Use recovery mode only when normal startup fails or you need repair options.",
            media: "assets/recovery.webp",
            type: "image",
            warning: "Do not run repair commands you do not understand. Write down the issue first."
          }
        ]
      }
    ],
    quiz: [
      {
        id: 1,
        question: "What should you write down when troubleshooting?",
        choices: ["The exact error message or behavior", "Only the wallpaper color", "The quiz score", "The browser theme"],
        answer: 0
      },
      {
        id: 2,
        question: "Where should you first check for official GPU driver options in Ubuntu?",
        choices: ["Additional Drivers", "Random driver websites", "A text editor", "Rufus"],
        answer: 0
      },
      {
        id: 3,
        question: "When is recovery mode most useful?",
        choices: ["When normal startup fails or repair options are needed", "Every time you install an app", "Only for watching videos", "When creating a folder"],
        answer: 0
      }
    ]
  }
};

const moduleOrder = [
  "ubuntu-installation",
  "ubuntu-navigation",
  "ubuntu-commands",
  "ubuntu-apps",
  "ubuntu-troubleshooting"
];

function getPublicModule(module) {
  return {
    ...module,
    quiz: module.quiz.map(({ answer, ...question }) => question)
  };
}

function getUbuntuModules() {
  return moduleOrder.map((id) => {
    const module = tutorials[id];

    return {
      id: module.id,
      distro: module.distro,
      title: module.title,
      icon: module.icon,
      summary: module.summary,
      objectives: module.objectives,
      lessonCount: module.lessons.length,
      quizCount: module.quiz.length
    };
  });
}

module.exports = {
  tutorials,
  moduleOrder,
  getPublicModule,
  getUbuntuModules
};

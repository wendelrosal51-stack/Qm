const tutorials = {
  "ubuntu-installation": {
    id: "ubuntu-installation",
    distro: "Ubuntu",
    title: "Installation",
    icon: "assets/install.png",
    summary: "Prepare an Ubuntu installer safely, understand the ISO file, and create a bootable USB and select your configurations.",
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
      },
      {
        id: 4,
        title: "Start-Up Configurations",
        steps: [
          {
            text: "Select your preferred language to localize the installation process and system interface.",
            media: "assets/ubuntu_install1.mp4",
            type: "video"
          },
          {
            text: "Toggle your preferred accessiblity settings.",
            media: "assets/ubuntu_install2.mp4",
            type: "video",
          },
          {
            text: "Choose your keyboard layout.",
            media: "assets/ubuntu_install3.mp4",
            type: "video"
          },
          {
            text: "Choose your network connection type to determine how the installer fetches updates and drivers during setup.",
            media: "assets/ubuntu_install4.mp4",
            type: "video"
          },
          {
            text: "Determine whether you want to evaluate the operating system in a temporary environment or permanently commit it to your storage drive.",
            media: "assets/ubuntu_install5.mp4",
            type: "video"
          },
          {
            text: "Choose whether to proceed with a manual setup or utilize a pre-configured automation template to provision the system.",
            media: "assets/ubuntu_install6.mp4",
            type: "video"
          },
          {
            text: "Choose the starting package bundle to define the initial software footprint on your desktop.",
            media: "assets/ubuntu_install7.mp4",
            type: "video"
          },
          {
            text: "Configure whether the installer should include closed-source drivers and proprietary codecs to optimize hardware performance and media playback.",
            media: "assets/ubuntu_install8.mp4",
            type: "video"
          },
          {
            text: "Specify how the installer should structure your storage drive and handle system partitions.",
            media: "assets/ubuntu_install9.mp4",
            warning:"Choosing to 'Erase disk and Install Ubuntu' will format your entire flash drive, make sure to back up your files!",
            type: "video"
          },
          {
            text: "Select the target file system format and define security protocols to safeguard your local storage data.",
            media: "assets/ubuntu_install10.mp4",
            type: "video"
          },
          {
            text: "Input your personal details, machine identity, and security credentials to establish the primary system administrator account.",
            media: "assets/ubuntu_install11.mp4",
            type: "video"
          },
          {
            text: "Choose your geographical region or nearest city to synchronize your computer clock and manage regional time settings accurately.",
            media: "assets/ubuntu_install12.mp4",
            type: "video"
          },
          {
            text: "Examine the comprehensive summary configuration report before committing changes to your storage drive and initiating the final deployment phase.",
            media: "assets/ubuntu_install13.mp4",
            type: "video"
          },

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
    summary: "Learn the Ubuntu directory layout, directory creation and file navigation.",
    objectives: [
      "Recognize the Ubuntu dock, app launcher, and system menu",
      "Use Files to browse common folders",
      "Open Settings and adjust basic preferences"
    ],
    lessons: [
      {
        id: 1,
        title: "Navigating the File System with the Terminal",
        steps: [
          {
            text: "Open the Terminal by pressing Ctrl + Alt + T or searching 'Terminal' in the Applications menu..",
            media: "assets/ubuntu-navigation-lesson1.1.mp4",
            type: "video"
          },
          {
            text: "Type pwd and press Enter. This prints your current directory location.",
            media: "assets/ubuntu-navigation-lesson1.2.mp4",
            type: "video"
          },
          {
            text: "Type ls and press Enter to list all files and folders in your current directory.",
            media: "assets/ubuntu-navigation-lesson1.3.mp4",
            type: "video"
          },
          {
            text: "Type ls -la to see a detailed list including hidden files (those starting with a dot).",
            media: "assets/ubuntu-navigation-lesson1.4.mp4",
            type: "video"
          },
          {
            text: "Type cd and type your directory name and press Enter to move into the that folder.",
            media: "assets/ubuntu-navigation-lesson1.5.mp4",
            type: "video"
          },
          {
            text: "Type cd .. to go back one level to the parent directory.",
            media: "assets/ubuntu-navigation-lesson1.6.mp4",
            type: "video"
          },
          {
            text: "Type cd ~ to instantly return to your home directory from anywhere.",
            media: "assets/ubuntu-navigation-lesson1.7.mp4",
            type: "video"
          },
        ]
      },
    {
        id: 2,
        title: "Creating and Deleting Files and Folders",
        steps: [
          {
            text: "Open the Terminal by pressing Ctrl + Alt + T or searching 'Terminal' in the Applications menu..",
            media: "assets/ubuntu-navigation-lesson1.1.mp4",
            type: "video"
          },
          {
            text: "Type mkdir yourFolderName and press Enter to create a new folder with the name you typed in.",
            media: "assets/ubuntu-navigation-lesson2.1.mp4",
            type: "video"
          },
          {
            text: "Type touch yourFileName.txt to create a new empty text file inside the folder you are in.",
            media: "assets/ubuntu-navigation-lesson2.2.mp4",
            type: "video"
          },
          {
            text: "Type mv yourFileName.txt yourNewFileName.txt to rename the file.",
            media: "assets/ubuntu-navigation-lesson2.3.mp4",
            type: "video"
          },
          {
            text: "Type cp yourFileName.txt yourBackupFileName.txt to make a copy of the file.",
            media: "assets/ubuntu-navigation-lesson2.4.mp4",
            type: "video"
          },
          {
            text: "Type rm yourFileName.txt to delete your chosen file.",
            media: "assets/ubuntu-navigation-lesson2.5.mp4",
            type: "video"
          },
          {
            text: "Go back with cd .. then type rm -r yourFolderName to delete the entire folder and its contents.",
            media: "assets/ubuntu-navigation-lesson2.6.mp4",
            type: "video"
          },
        ]
      },
      {
        id: 3,
        title: "Searching for Files and Folders Using the Terminal",
        steps: [
          {
            text: "Open the Terminal by pressing Ctrl + Alt + T or searching 'Terminal' in the Applications menu..",
            media: "assets/ubuntu-navigation-lesson1.1.mp4",
            type: "video"
          },
          {
            text: "Type find / -name /\"yourFileName.txt\" 2>/dev/null and press Enter to search the entire system for a file by name.",
            media: "assets/ubuntu-navigation-lesson3.1.mp4",
            type: "video"
          },
          {
            text: "Type find ~ -name \"*.txt\" to search only your home directory for all files ending in .txt. The * is a wildcard that matches anything.",
            media: "assets/ubuntu-navigation-lesson3.2.mp4",
            type: "video"
          },
          {
            text: "Type find ~ -type d -name \"yourFolderName\" to search specifically for a directory instead of a file.",
            media: "assets/ubuntu-navigation-lesson3.3.mp4",
            type: "video"
          }
        ]
      },
       {
        id: 2,
        title: "Creating and Deleting Files and Folders",
        steps: [
          {
            text: "Open the Terminal by pressing Ctrl + Alt + T or searching 'Terminal' in the Applications menu..",
            media: "assets/ubuntu-navigation-lesson1.1.mp4",
            type: "video"
          },
          {
            text: "Type mkdir yourFolderName and press Enter to create a new folder with the name you typed in.",
            media: "assets/ubuntu-navigation-lesson2.1.mp4",
            type: "video"
          },
          {
            text: "Type touch yourFileName.txt to create a new empty text file inside the folder you are in.",
            media: "assets/ubuntu-navigation-lesson2.2.mp4",
            type: "video"
          },
          {
            text: "Type mv yourFileName.txt yourNewFileName.txt to rename the file.",
            media: "assets/ubuntu-navigation-lesson2.3.mp4",
            type: "video"
          },
          {
            text: "Type cp yourFileName.txt yourBackupFileName.txt to make a copy of the file.",
            media: "assets/ubuntu-navigation-lesson2.4.mp4",
            type: "video"
          },
          {
            text: "Type rm yourFileName.txt to delete your chosen file.",
            media: "assets/ubuntu-navigation-lesson2.5.mp4",
            type: "video"
          },
          {
            text: "Go back with cd .. then type rm -r yourFolderName to delete the entire folder and its contents.",
            media: "assets/ubuntu-navigation-lesson2.6.mp4",
            type: "video"
          },
        ]
      },
      {
        id: 3,
        title: "Searching for Files and Folders Using the Terminal",
        steps: [
          {
            text: "Open the Terminal by pressing Ctrl + Alt + T or searching 'Terminal' in the Applications menu..",
            media: "assets/ubuntu-navigation-lesson1.1.mp4",
            type: "video"
          },
          {
            text: "Type find / -name /\"yourFileName.txt\" 2>/dev/null and press Enter to search the entire system for a file by name.",
            media: "assets/ubuntu-navigation-lesson3.1.mp4",
            type: "video"
          },
          {
            text: "Type find ~ -name \"*.txt\" to search only your home directory for all files ending in .txt. The * is a wildcard that matches anything.",
            media: "assets/ubuntu-navigation-lesson3.2.mp4",
            type: "video"
          },
          {
            text: "Type find ~ -type d -name \"yourFolderName\" to search specifically for a directory instead of a file.",
            media: "assets/ubuntu-navigation-lesson3.3.mp4",
            type: "video"
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
    summary: "Practice beginner terminal commands.",
    objectives: [
      "Open the terminal",
      "Use pwd, ls, and cd",
      "Create folders safely with mkdir"
    ],
    lessons: [
      {
        id: 1,
        title: "Getting to Know Your Way Around the Terminal",
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

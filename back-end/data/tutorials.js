const tutorials = {
  // marker1
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
            text: "Open the Terminal by pressing Ctrl + Alt + T or searching 'Terminal' in the Applications menu.",
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
    summary: "Practice beginner Ubuntu terminal commands.",
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
            media: "assets/ubuntu-navigation-lesson1.1.mp4",
            type: "video"
          },
          {
            text: "Look at the prompt line. The ~ tells you that you are currently in your home folder. The $ means you are a regular user.",
            media: "assets/ubuntu-terminal-lesson1.1.mp4",
            type:"video"
          },
          {
            text: "Type whoami and press Enter to confirm which user you are logged in as.",
            media: "assets/ubuntu-terminal-lesson1.2.mp4",
            type:"video"
          },
          {
            text: "Type uname -a to see basic information about your Ubuntu system.",
            media: "assets/ubuntu-terminal-lesson1.3.mp4",
            type:"video"
          },
          {
            text: " If you mistype a command, press Ctrl + C to cancel it and get a fresh prompt line.",
            media: "assets/ubuntu-terminal-lesson1.4.mp4",
            type:"video"
          },
          {
            text: "Press the Up arrow key to bring back your last typed command without retyping it.",
            media: "assets/ubuntu-terminal-lesson1.5.mp4",
            type:"video"
          },
          {
            text: "Type clear to clean up the screen when it gets too cluttered.",
            media: "assets/ubuntu-terminal-lesson1.6.mp4",
            type:"video"
          },
          {
            text: "Type history to see a list of every command you have typed so far.",
            media: "assets/ubuntu-terminal-lesson1.7.mp4",
            type:"video"
          },
          {
            text: "To repeat a specific command from your history, type ! followed by its number.",
            media: "assets/ubuntu-terminal-lesson1.8.mp4",
            type:"video"
          },
        ]
      },
      {
        id: 2,
        title: "Using Shortcuts and Tricks to Work Faster in the Terminal",
        steps: [
          {
            text: "Open Terminal from the app launcher.",
            media: "assets/ubuntu-navigation-lesson1.1.mp4",
            type: "video"
          },
          {
            text: "Start typing a long folder or file name and press Tab to autocomplete it. If there are multiple matches, press Tab twice to see all options.",
            media: "assets/ubuntu-terminal-lesson2.1.mp4",
            type:"video"
          },
          {
            text: "Use Ctrl + A to jump to the beginning of a command line instantly without using the arrow keys, Ctrl + E to jump to the end of the command line, Ctrl + W to delete only the last word you typed instead of the whole line, Ctrl + U to erase everything you have typed on the current line and start fresh.",
            media: "assets/ubuntu-terminal-lesson2.2.mp4",
            type:"video"
          },
          {
            text: "Run two commands in a single line using &&, the second command only runs if the first one succeeds.",
            media: "assets/ubuntu-terminal-lesson2.3.mp4",
            type:"video"
          },
          {
            text: "Use ; to run two commands one after another regardless of whether the first succeeds.",
            media: "assets/ubuntu-terminal-lesson2.4.mp4",
            type:"video"
          },
         
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
    summary: "Install, Update and Remove apps",
    objectives: [
      "Understand apt update and apt install",
      "Know when to use Ubuntu Software",
      "Install recommended apps with confidence"
    ],
    lessons: [
      {
        id: 1,
        title: "Understanding How Apps Are Installed in Ubuntu",
        steps: [
          {
            text: "sudo means \"superuser do\", It allows a normal user to run commands with administrator (root) privileges temporarily. APT means \"Advanced Package Tool\", It is the package manager used in Debian-based Linux distributions like Ubuntu. While snap is a type of software package used in Ubuntu and other Linux systems to install applications in a simple, self-contained way.",
            command:"sudo , apt , snap"
          },
          {
            text: "Open the Terminal in the Application Menu. ",
            media: "assets/ubuntu-navigation-lesson1.1.mp4",
            type: "video"
          },
          {
            text: "Before installing anything for the first time or after a while, always update your package list first using sudo apt update so APT knows about the latest available versions. ",
            media: "assets/ubuntu-apps-lesson1.1.mp4",
            type: "video"
          },
          {
            text: "If there are available updates, type in sudo apt upgrade to upgrade all installed apps and system packages at once.",
            media: "assets/ubuntu-apps-lesson1.2.mp4",
            type: "video"
          },
          {
            text: "Ubuntu's default way of installing apps is through APT using sudo apt install appName.",
            media: "assets/ubuntu-apps-lesson1.3.mp4",
            type: "video"
          },
          {
            text: "A second way to install apps is through Snap. Type in sudo snap install appName",
            media: "assets/ubuntu-apps-lesson1.4.mp4",
            type: "video"
          },
          {
            text: "To check what applications are installed via apt install, type in apt list --installed.",
            media: "assets/ubuntu-apps-lesson1.5.mp4",
            type: "video"
          },
          {
            text: "To view apps installed via snap, type snap list.",
            media: "assets/ubuntu-apps-lesson1.6.mp4",
            type: "video"
          },
          {
            text: "Type sudo snap refresh to update all applications. To update a specific Snap app only, type in sudo snap refresh appName",
            media: "assets/ubuntu-apps-lesson1.7.mp4",
            type: "video"
          }
        ]
      },
      {
        id: 2,
        title: "Removing Apps and Cleaning Up Your System",
        steps: [
          {
            text: "Open the Terminal in the Application Menu.",
            media: "assets/ubuntu-navigation-lesson1.1.mp4",
            type: "video"
          },
          {
            text: "To remove an app installed via APT, type sudo apt remove appName, this removes the app but leaves behind its configuration files.",
            media: "assets/ubuntu-apps-lesson2.1.mp4",
            type: "video"
          },
          {
            text: "Remove the app and all its configuration files completely using sudo apt purge appName.",
            media: "assets/ubuntu-apps-lesson2.2.mp4",
            type: "video"
          },
          {
            text: "To also remove the cached installation files that APT downloaded and stored locally, type sudo apt clean.",
            media: "assets/ubuntu-apps-lesson2.3.mp4",
            type: "video"
          },
          {
            text: "And finally, to check how much disk space was recovered after cleaning up, run the command df -h",
            media: "assets/ubuntu-apps-lesson2.4.mp4",
            type: "video"
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
        title: "Unresponsive Programs and Applications",
        steps: [
          {
            text: "Open the Terminal in the Application Menu.",
            media: "assets/ubuntu-navigation-lesson1.1.mp4",
            type: "video"
          },
          {
            text: "Find the name of the unresonposive app and terminate it by name.",
            media: "assets/ubuntu-trouble-lesson1.1.mp4",
            type: "video"
          },
          {
            text: "If that does not work, find the exact Process ID (PID) of the frozen app by typing pgrep appName, then use kill -9 appPID to force close the app.",
            media: "assets/ubuntu-trouble-lesson1.2.mp4",
            type: "video",
          },
          {
            text: "If the entire desktop is unresponsive, try switching to a virtual console by pressing Ctrl + alt + f3. Log in with your username and password, then kill the frozen app from there using pkill or kill. Switch back to desktop using ctrl + alt + f2.",
            media: "assets/ubuntu-trouble-lesson1.3.mp4",
            type: "video",
          },
          {
            text: "As a last resort if nothing works, do a safe system restart from the terminal by typing sudo reboot -f",
            media: "assets/ubuntu-trouble-lesson1.4.mp4",
            type: "video",
          },
        ]
      },
      {
        id: 2,
        title: "Broken or Incomplete Software Installation",
        steps: [
          {
            text: "Open the Terminal in the Application Menu.",
            media: "assets/ubuntu-navigation-lesson1.1.mp4",
            type: "video"
          },
          {
            text: "The most common fix for broken installations is sudo apt install -f, stands for \"fix broken\". This automatically detects and repairs incomplete or broken package installations.",
            media: "assets/ubuntu-trouble-lesson2.1.mp4",
            type: "video"
          },
          {
            text: " If that does not fully fix it, try reconfiguring all unpacked but unconfigured packages using sudo dpkg --configure -a.",
            media: "assets/ubuntu-trouble-lesson2.2.mp4",
            type: "video",
          },
          {
            text: "Clear the local package cache in case a downloaded package file is corrupted by typing sudo apt clean. Then refresh the package list and try upgrading again using sudo apt update && sudo apt upgrade.",
            media: "assets/ubuntu-trouble-lesson2.4.mp4",
            type: "video",
          },
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
  },
  // marker2
  "mint-installation": {
    id: "mint-installation",
    distro: "Mint",
    title: "Installation",
    icon: "assets/installation.png",
    summary: "Learn safe first checks for common Ubuntu problems before trying risky fixes.",
    objectives: [
      "Restart and observe error messages",
      "Check network, updates, and drivers",
      "Know when to use recovery mode carefully"
    ],
    lessons: [
      {
        id: 1,
        title: "Unresponsive Programs and Applications",
        steps: [
          {
            text: "Open the Terminal in the Application Menu.",
            media: "assets/ubuntu-navigation-lesson1.1.mp4",
            type: "video"
          }
        ]
      },
    ],
    quiz: [
      {
        id: 1,
        question: "What should you write down when troubleshooting?",
        choices: ["The exact error message or behavior", "Only the wallpaper color", "The quiz score", "The browser theme"],
        answer: 0
      }
    ]
  },
  "mint-navigation": {
    id: "mint-navigation",
    distro: "Mint",
    title: "Basic Navigation",
    icon: "assets/features.png",
    summary: "Learn safe first checks for common Ubuntu problems before trying risky fixes.",
    objectives: [
      "Restart and observe error messages",
      "Check network, updates, and drivers",
      "Know when to use recovery mode carefully"
    ],
    lessons: [
      {
        id: 1,
        title: "Unresponsive Programs and Applications",
        steps: [
          {
            text: "Open the Terminal in the Application Menu.",
            media: "assets/ubuntu-navigation-lesson1.1.mp4",
            type: "video"
          }
        ]
      },
    ],
    quiz: [
      {
        id: 1,
        question: "What should you write down when troubleshooting?",
        choices: ["The exact error message or behavior", "Only the wallpaper color", "The quiz score", "The browser theme"],
        answer: 0
      }
    ]
  },
  "mint-commands": {
    id: "mint-commands",
    distro: "Mint",
    title: "Terminal Commands",
    icon: "assets/commands.png",
    summary: "Learn safe first checks for common Ubuntu problems before trying risky fixes.",
    objectives: [
      "Restart and observe error messages",
      "Check network, updates, and drivers",
      "Know when to use recovery mode carefully"
    ],
    lessons: [
      {
        id: 1,
        title: "Unresponsive Programs and Applications",
        steps: [
          {
            text: "Open the Terminal in the Application Menu.",
            media: "assets/ubuntu-navigation-lesson1.1.mp4",
            type: "video"
          }
        ]
      },
    ],
    quiz: [
      {
        id: 1,
        question: "What should you write down when troubleshooting?",
        choices: ["The exact error message or behavior", "Only the wallpaper color", "The quiz score", "The browser theme"],
        answer: 0
      }
    ]
  },
  "mint-apps": {
    id: "mint-apps",
    distro: "Mint",
    title: "App Installation",
    icon: "assets/apps.png",
    summary: "Learn safe first checks for common Ubuntu problems before trying risky fixes.",
    objectives: [
      "Restart and observe error messages",
      "Check network, updates, and drivers",
      "Know when to use recovery mode carefully"
    ],
    lessons: [
      {
        id: 1,
        title: "Unresponsive Programs and Applications",
        steps: [
          {
            text: "Open the Terminal in the Application Menu.",
            media: "assets/ubuntu-navigation-lesson1.1.mp4",
            type: "video"
          }
        ]
      },
    ],
    quiz: [
      {
        id: 1,
        question: "What should you write down when troubleshooting?",
        choices: ["The exact error message or behavior", "Only the wallpaper color", "The quiz score", "The browser theme"],
        answer: 0
      }
    ]
  },
  "mint-troubleshooting": {
    id: "mint-troubleshooting",
    distro: "Mint",
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
        title: "Unresponsive Programs and Applications",
        steps: [
          {
            text: "Open the Terminal in the Application Menu.",
            media: "assets/ubuntu-navigation-lesson1.1.mp4",
            type: "video"
          }
        ]
      },
    ],
    quiz: [
      {
        id: 1,
        question: "What should you write down when troubleshooting?",
        choices: ["The exact error message or behavior", "Only the wallpaper color", "The quiz score", "The browser theme"],
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

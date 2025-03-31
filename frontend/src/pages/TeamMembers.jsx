import React from 'react';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

const TeamMembers = () => {
  const team = [
    {
      id: 1,
      name: "Yash",
      contribution: "Smart Contract Development, Frontend Blockchain Integration & Technical Lead ",
      techStack: "Solidity, Web3.js, Foundry, React",
      social: {
        linkedin: "https://www.linkedin.com/in/singhyashh/",
        github: "https://github.com/singhyash05",
        twitter: "https://x.com/singhyashhhhh",
        email: "yashsingh5609@gmail.com"
      }
    },
    {
      id: 2,
      name: "Shreyansh",
      contribution: "Frontend Development and Team Leader",
      techStack: "React.js, JavaScript, HTML, CSS, Tailwind CSS",
      social: {
        linkedin: "https://in.linkedin.com/in/shreyansh-vinay-60734b337",
        github: "https://github.com/shreyansh",
        twitter: "https://x.com/ishreyansh05",
        email: "shreyanshvinay919@gmail.com"
      }
    },
    {
      id: 3,
      name: "Alok",
      contribution: "Frontend Development",
      techStack: "React.js, JavaScript, HTML, CSS, Tailwind CSS",
      social: {
        linkedin: "https://linkedin.com/in/alok",
        github: "https://github.com/alok",
        twitter: "https://twitter.com/alok",
        email: "alok@verdifi.com"
      }
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-white mb-12 animate-fade-in">Our Team</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {team.map((member, index) => (
          <div 
            key={member.id}
            className="bg-green-950 rounded-xl shadow-xl p-6 card-hover animate-fade-in"
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
              <p className="text-green-400 mb-3">{member.contribution}</p>
              <p className="text-green-200 text-sm mb-6">{member.techStack}</p>
              
              <div className="flex justify-center space-x-6">
                <a 
                  href={member.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-200 hover:text-green-400 transition-colors"
                >
                  <Linkedin className="h-6 w-6" />
                </a>
                <a 
                  href={member.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-200 hover:text-green-400 transition-colors"
                >
                  <Github className="h-6 w-6" />
                </a>
                <a 
                  href={member.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-200 hover:text-green-400 transition-colors"
                >
                  <Twitter className="h-6 w-6" />
                </a>
                <a 
                  href={`mailto:${member.social.email}`}
                  className="text-green-200 hover:text-green-400 transition-colors"
                >
                  <Mail className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamMembers;
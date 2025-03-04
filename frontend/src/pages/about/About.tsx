import { FiFilm, FiStar, FiUsers, FiMessageSquare } from "react-icons/fi";

function AboutPage() {
  const features = [
    {
      icon: FiFilm,
      title: "Comprehensive Movie Database",
      description:
        "Access detailed information about thousands of movies, from classics to the latest releases.",
    },
    {
      icon: FiStar,
      title: "User Reviews & Ratings",
      description:
        "Share your thoughts and read reviews from our community of movie enthusiasts.",
    },
    {
      icon: FiUsers,
      title: "Community Driven",
      description:
        "Join a passionate community of movie lovers who share your interests and recommendations.",
    },
    {
      icon: FiMessageSquare,
      title: "Interactive Discussions",
      description:
        "Engage in meaningful discussions about movies, directors, and cinematic experiences.",
    },
  ];

  const team = [
    {
      name: "John Doe",
      role: "Founder & CEO",
      bio: "A passionate movie enthusiast with over 15 years of experience in film criticism.",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      name: "Jane Smith",
      role: "Content Director",
      bio: "Former film critic with expertise in both mainstream and independent cinema.",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      name: "Mike Johnson",
      role: "Community Manager",
      bio: "Dedicated to fostering a positive and engaging community for movie lovers.",
      image:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-16">
      {/* Hero Section */}
      <div className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-purple-900/50"></div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1489599929927-2fd91e3e7d32?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
          }}
        ></div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">About MovieReviews</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Your ultimate destination for discovering, discussing, and sharing
            your love for cinema.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-gray-400 text-lg">
            At MovieReviews, we believe that every movie has a story to tell,
            and every viewer has a unique perspective to share. Our mission is
            to create a vibrant community where movie enthusiasts can discover
            new films, share their thoughts, and connect with others who share
            their passion for cinema.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-800 rounded-lg p-6 text-center">
              <div className="inline-block p-3 bg-blue-500 rounded-full mb-4">
                <feature.icon className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Team Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-gray-800 rounded-lg p-6">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-blue-400 mb-2">{member.role}</p>
                <p className="text-gray-400">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gray-800 rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Become a part of our growing community of movie enthusiasts. Share
            your reviews, discover new films, and connect with fellow movie
            lovers.
          </p>
          <button className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;

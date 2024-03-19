import "./Welcome.css"

const Welcome = () => {
  return (
    <div className="container">
      <div className="wrapper">
        <h1>Welcome to Jello - Your Ultimate Organizational Companion!</h1>

        <p className="intro">
          Streamline your work and life with <strong>Jello</strong>, the vibrant and intuitive platform designed to transform the way you organize projects, collaborate with teams, and conquer your daily tasks. <strong>Jello</strong> brings a new level of clarity, creativity, and efficiency to your planning, ensuring no detail is overlooked.
        </p>

        <div className="content">
          <h2>Why Jello Shines:</h2>
          <div className="feature">
            <h3>Effortless Organization</h3>
            <p>Dive into our colorful boards, customizable lists, and powerful cards. <strong>Jello</strong> makes tracking your projects a visual delight and a breeze to manage.</p>
          </div>
          <div className="feature">
            <h3>Collaborate Like Never Before</h3>
            <p>Invite your team, assign tasks, and watch your projects flourish. Real-time updates and comments mean everyone stays in sync, no matter where they are.</p>
          </div>
          <div className="feature">
            <h3>Customize Your Workflow</h3>
            <p>With <strong>Jello</strong>, your workspace adapts to you. Personalize your boards with vibrant themes and integrate seamlessly with your favorite tools to supercharge your productivity.</p>
          </div>
          <div className="feature">
            <h3>Always in the Loop</h3>
            <p>Stay informed with timely notifications and set up automations that make manual tasks a thing of the past. <strong>Jello</strong> keeps you ahead, so nothing falls through the cracks.</p>
          </div>
        </div>

        <h2>Embrace the Joy of Being Organized with Jello</h2>
        <p>Where every detail matters, and productivity meets fun!</p>
        <p>Start your journey to seamless organization today!</p>
      </div>
    </div>
  )
}

export default Welcome
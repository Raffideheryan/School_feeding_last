import React from 'react'

const SectionDescrition = () => {
  const [modal,setModal]  = useState(false)
  return (
    <>
    {modal && (
      <div className='sectionDescription'>
      <h3>Hello, future Champions of Healthy Lifestyle!</h3>
      <p>Did you know that our health and energy depend a lot on the way we live? Living without bad habits is a great start, but there's so much more to it! To feel less sick, stay strong, sharp, and ready for exciting adventures, we need a healthy lifestyle. And guess what? It's way more exciting than it might seem!</p>
      <p>A healthy lifestyle isn't just a trend you pick up for a bit and then forget about. Sometimes people suddenly switch to vegetables and sports, but then they end up back on their favorite couch with popcorn and soda.</p>
      <p>
      But here's the secret: a healthy lifestyle is about making healthy choices a part of your daily routine. It's not a sudden impulse; it's a habit that makes life awesome! It's about eating healthy and nutritious, following a daily routine, balancing work and play, and moving our bodies every day.
      </p>
      <p>Now, imagine being a superhero inspiring others to live healthier! That's what the Healthy Lifestyle Ambassador competition is all about. We're calling on older students like you to become role models for the younger ones, sharing the amazing ideas of a healthy lifestyle.</p>
      <p>Here's the scoop: this competition is about creating super cool projects focused on healthy living. The creators of the best projects get to join a health camp for a whole week! Here, you'll become real ambassadors, learning cool ways to spread the word about living healthy and getting your whole community on board!</p>
      <p>Ready to be a part of something incredible? Join us in becoming champions of healthy living and inspiring others to live their best, healthiest lives!</p>
      <h4></h4>
    </div>
  )}
   </>
  )
}

export default SectionDescrition

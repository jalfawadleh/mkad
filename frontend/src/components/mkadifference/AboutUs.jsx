import {
  ActivityCircle,
  MKaDifferenceCircle,
  MemberCircle,
  OrganisationCircle,
} from "../common/Icons";

const AboutUs = () => {
  return (
    <div className='container'>
      <h2 className='text-center text-primary border-primary-subtle border-top border-bottom py-2 mb-3'>
        Who We Are
      </h2>
      <div className='d-block p-1 ms-0 mb-3' style={{ textAlign: "justify" }}>
        <span style={{ float: "left" }}>
          <MKaDifferenceCircle />
        </span>
        MKaDifference is A digital platform designed for people to connect and
        engage with one another while safeguarding their personal information
        and privacy.
      </div>
      <div className='d-block p-1 ms-0 mb-3' style={{ textAlign: "justify" }}>
        <span style={{ float: "left" }}>
          <OrganisationCircle />
        </span>
        <i className='text-warning'>
          Organizations, including communities, nonprofits, charities, and
          unions
        </i>
        , have the power to unite people for noble purposes. Simultaneously,
        they can ask for volunteers to help, and express the help they offer.
      </div>
      <div className='d-block p-1 ms-0 mb-3' style={{ textAlign: "justify" }}>
        <span style={{ float: "left" }}>
          <ActivityCircle />
        </span>
        <b className='text-success'>Activities</b> are made by organisations for
        members to participate, by attending them in person. Alternatively, they
        can engage in discussions related to activities and organizations
        online.
      </div>
      <div className='d-block p-1 ms-0 mb-3' style={{ textAlign: "justify" }}>
        <span style={{ float: "left" }}>
          <MemberCircle />
        </span>
        <b className='text-primary'>Members</b> can give and receive support
        through their profiles, as well as connect with others who share similar
        interests and hobbies.
      </div>
      <div
        className='align-justify mb-3 text-info'
        style={{ textAlign: "justify" }}
      >
        MKaDifference is made for people. <b> Regardless of </b>race, ethnicity,
        age, gender, religion, sexual orientation, gender identity, gender
        expression, disability, economic status or anything that can divide us.
      </div>

      <div className='align-justify mb-3' style={{ textAlign: "justify" }}>
        <h3 className='text-center text-primary border-primary-subtle border-top border-bottom py-2 mb-3'>
          Why Join Us
        </h3>

        <p style={{ textAlign: "justify" }}>
          MKaDifference created as an alternative to existing social media
          corporations, aims to address the issue of extensive data collection
          about individuals.
        </p>
        <p style={{ textAlign: "justify" }}>
          In our view, the most effective approach to safeguarding your personal
          information is to refrain from sharing it in the first place,
          particularly with for-profit corporations as for them you are the
          product while the customer is the advertising agencies.
        </p>
        <p style={{ textAlign: "justify" }}>
          No cookies used, to make it almost impossible for trackers from other
          sites to trace your online activity. Consequently, social media
          platforms cannot easily link your profile to other data they have
          already collected.
        </p>
        <p style={{ textAlign: "justify" }}>
          Additionally, the moment you refresh the page or close the browser,
          you are automatically logged out, and your data connection is
          eliminated. This practice enhances your privacy and minimizes the
          digital footprint you leave behind.
        </p>
        <p className='text-center'>
          <b>
            <i>Never share what you don&apos;t want strangers to know!</i>
          </b>
        </p>
      </div>

      <div className='align-justify mb-3' style={{ textAlign: "justify" }}>
        <h3 className='text-center text-primary border-primary-subtle border-top border-bottom py-2 mb-3'>
          How are we different
        </h3>

        <p style={{ textAlign: "justify" }}>
          Excessive screen time due to social media addiction is a challenge we
          strive to overcome. Often, platform are controlling users, rather than
          the serving them, as incessant notifications flood our lives and fill
          us with the wrong dopamine.
        </p>
        <p style={{ textAlign: "justify" }}>
          Cyberbullying and exposure to harmful content pose risks. However,
          when using this platform, you are shielded and protected, and your
          identity remains secure unless you choose otherwise.
        </p>
        <p style={{ textAlign: "justify" }}>
          Excessive social isolation may result in loneliness. Additionally,
          sleep disruption can interfere with academic performance. Encouraging
          people to participate in events that foster natural human social
          interaction can help mitigate these effects.
        </p>
        <p style={{ textAlign: "justify" }}>
          Body image issues arise from social media, where unrealistic
          expectations about appearance and social standing can lead to a
          dangerous epidemic in society. In extreme cases, this pressure may
          even result in suicide. One way to mitigate this impact is by limiting
          the use of photos and videos
        </p>
      </div>

      <div className='align-justify mb-3' style={{ textAlign: "justify" }}>
        <h3 className='text-center text-primary border-primary-subtle border-top border-bottom py-2 mb-3'>
          Why no photos, videos or audio
        </h3>

        <p style={{ textAlign: "justify" }}>
          Photos contains powerful visual identifiers, and risks including and
          not limited to:
        </p>
        <ul>
          <li>
            Identity: A single photograph can encapsulate a person’s
            essence—their smile, posture, and unique features. It’s a visual
            fingerprint that distinguishes one individual from another.
          </li>
          <li>
            Geolocation: Photos often carry embedded metadata, including GPS
            coordinates. This unintentionally discloses where the photo was
            taken, potentially revealing personal routines and favorite spots.
          </li>
          <li>
            Gender and Age: Facial features, hairstyles, and clothing choices
            can hint at a person’s gender and age. These visual cues contribute
            to our perception of identity.
          </li>
          <li>
            Skin Color and Ethnicity: Skin tones and facial features provide
            insights into a person’s ethnicity. Unfortunately, this information
            has been misused for discriminatory purposes.
          </li>
          <li>
            Emotions: Candid shots capture raw emotions—joy, sadness, surprise,
            or contemplation. These glimpses into our inner worlds connect us as
            humans.
          </li>
          <li>
            Social Context: Photos often depict people in specific
            settings—family gatherings, parties, or work events. These contexts
            reveal our social circles and affiliations.
          </li>
          <li>
            Memories and Milestones: Each photo carries memories—a graduation,
            wedding, or travel adventure. These visual narratives shape our
            personal histories.
          </li>
        </ul>

        <p style={{ textAlign: "justify" }}>
          Risk of Misuse: When you share photos online, there is a chance they
          could be altered without your permission and then re-shared as memes
          or in other contexts. Once a photo is out there, it becomes
          challenging to remove it from the internet1.
        </p>
        <p style={{ textAlign: "justify" }}>
          Security Concerns: Sharing pictures of your home, hobbies, or
          possessions might inadvertently reveal valuable items like art,
          jewelry, or electronics. This information could attract potential
          thieves2.
        </p>
        <p style={{ textAlign: "justify" }}>
          Loss of Control: Even with privacy settings, photos posted online can
          be redistributed to large audiences. Someone can easily take a
          screenshot and repost the photo elsewhere, effectively bypassing
          privacy controls3.
        </p>
        <p style={{ textAlign: "justify" }}>
          Unintended Exposure: Photos of family members can inadvertently expose
          their identities, locations, or make them potential targets. It’s
          essential to consider the privacy implications before sharing such
          images2.
        </p>
        <p style={{ textAlign: "justify" }}>
          Ethical Considerations: Sharing photos without consent can harm
          others. For instance, innocuous-seeming photos of children in
          swimsuits or other vulnerable situations may have unintended
          consequences4.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;

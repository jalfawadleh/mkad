import { useEffect } from "react";
import PureCounter from "@srexi/purecounterjs";

import LoginForm from "../components/LoginForm";

import { Container } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const LandingScreenNavbar = () => {
  return (
    <>
      <Navbar
        collapseOnSelect
        fixed='top'
        expand='sm'
        className='bg-body-tertiary'
        bg='dark'
        variant='dark'
      >
        <Container>
          <Navbar.Brand href='#'>MKaDifference</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse
            id='basic-navbar-nav'
            className='justify-content-end'
          >
            <Nav>
              <Nav.Link href='#login'>Login</Nav.Link>
              <Nav.Link href='#about'>Who We Are</Nav.Link>
              <Nav.Link href='#faq'>FAQ</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

const ScreenLanding = () => {
  useEffect(() => {
    new PureCounter();
  }, []);

  return (
    <>
      <LandingScreenNavbar />

      {/* <!-- ======= aboutUs Section ======= --> */}
      <section id='login' className='container'>
        <div className='row' style={{ paddingTop: "80px" }}>
          <div
            className='col-lg-6 '
            style={{ margin: "0 auto", position: "relative" }}
          >
            <LoginForm />
          </div>
          <div className='col-lg-6 pt-4 pt-lg-0'>
            <p>Example of how the website looks like</p>
          </div>
        </div>
      </section>
      {/* <!-- ======= aboutUs Section ======= --> */}
      <section id='about' className='container' style={{ paddingTop: "80px" }}>
        <h2 className='text-center pb-4'>Who We Are</h2>
        <div className='container pb-2'>
          <div className='row justify-content-center'>
            <div className='col-sm-3 col-6'>
              <div className='text-center'>
                <span
                  data-purecounter-start='0'
                  data-purecounter-end='65'
                  data-purecounter-duration='2'
                  className='purecounter h3'
                ></span>
                <p>Members</p>
              </div>
            </div>

            <div className='col-sm-3 col-6'>
              <div className='text-center'>
                <span
                  data-purecounter-start='0'
                  data-purecounter-end='85'
                  data-purecounter-duration='2'
                  className='purecounter h3'
                ></span>
                <p>Activities</p>
              </div>
            </div>

            <div className='col-sm-3 col-6'>
              <div className='text-center'>
                <span
                  data-purecounter-start='0'
                  data-purecounter-end='30'
                  data-purecounter-duration='2'
                  className='purecounter h3'
                ></span>
                <p>Organisations</p>
              </div>
            </div>
            <div className='col-sm-3 col-6'>
              <div className='text-center'>
                <span
                  data-purecounter-start='0'
                  data-purecounter-end='24'
                  data-purecounter-duration='2'
                  className='purecounter h3'
                ></span>
                <p>Unions</p>
              </div>
            </div>
          </div>
        </div>
        <div className='row content'>
          <div className='col-lg-6'>
            <p>
              MKaDifference is a platform for people to organise events in a
              healthy safe environment withought sacrificing there personal
              details.
            </p>
            <p>
              Members can join events and keep up to date with their communities
              and unions.
            </p>
            <p>
              Activities created by organisations to bring people together for a
              good cause.
            </p>
            <p>
              Many social media platforms collect and merge personal data; to
              create a complete profile about each one of us.
            </p>
          </div>
          <div className='col-lg-6 pt-2 pt-lg-0'>
            <p>
              MKaDifference will provide safe refuge, as there is no personal
              identification data collected from members (as you can see in the
              registration form).
            </p>
            <p>
              No cookies stored on your browser, therefore trackers from other
              sites will find no trace and there is no way for other social
              media to link your profile to other profile they already
              collected.
            </p>
            <p>
              The moment you refresh the page or close the browser you are
              logged out and your data connection is elementated.
            </p>
            <b>
              <i>Never share what you don&apos;t want strangers to know!</i>
            </b>
          </div>
        </div>
      </section>
      {/* <!-- ======= Frequently Asked Questions Section ======= --> */}
      <section id='faq' className='section-bg'>
        <div
          className='container'
          style={{ paddingTop: "80px" }}
          data-aos='fade-up'
        >
          <h2 className='text-center pb-4'>Frequently Asked Questions</h2>

          <div className='faq-list'>
            <ul>
              <li data-aos='fade-up'>
                <i className='bx bx-help-circle icon-help'></i>{" "}
                <a
                  data-bs-toggle='collapse'
                  className='collapse'
                  data-bs-target='#faq-list-1'
                >
                  Non consectetur a erat nam at lectus urna duis?{" "}
                  <i className='bx bx-chevron-down icon-show'></i>
                  <i className='bx bx-chevron-up icon-close'></i>
                </a>
                <div
                  id='faq-list-1'
                  className='collapse show'
                  data-bs-parent='.faq-list'
                >
                  <p>
                    Feugiat pretium nibh ipsum consequat. Tempus iaculis urna id
                    volutpat lacus laoreet non curabitur gravida. Venenatis
                    lectus magna fringilla urna porttitor rhoncus dolor purus
                    non.
                  </p>
                </div>
              </li>

              <li data-aos='fade-up' data-aos-delay='100'>
                <i className='bx bx-help-circle icon-help'></i>{" "}
                <a
                  data-bs-toggle='collapse'
                  data-bs-target='#faq-list-2'
                  className='collapsed'
                >
                  Feugiat scelerisque varius morbi enim nunc?{" "}
                  <i className='bx bx-chevron-down icon-show'></i>
                  <i className='bx bx-chevron-up icon-close'></i>
                </a>
                <div
                  id='faq-list-2'
                  className='collapse'
                  data-bs-parent='.faq-list'
                >
                  <p>
                    Dolor sit amet consectetur adipiscing elit pellentesque
                    habitant morbi. Id interdum velit laoreet id donec ultrices.
                    Fringilla phasellus faucibus scelerisque eleifend donec
                    pretium. Est pellentesque elit ullamcorper dignissim. Mauris
                    ultrices eros in cursus turpis massa tincidunt dui.
                  </p>
                </div>
              </li>

              <li data-aos='fade-up' data-aos-delay='200'>
                <i className='bx bx-help-circle icon-help'></i>{" "}
                <a
                  data-bs-toggle='collapse'
                  data-bs-target='#faq-list-3'
                  className='collapsed'
                >
                  Dolor sit amet consectetur adipiscing elit?{" "}
                  <i className='bx bx-chevron-down icon-show'></i>
                  <i className='bx bx-chevron-up icon-close'></i>
                </a>
                <div
                  id='faq-list-3'
                  className='collapse'
                  data-bs-parent='.faq-list'
                >
                  <p>
                    Eleifend mi in nulla posuere sollicitudin aliquam ultrices
                    sagittis orci. Faucibus pulvinar elementum integer enim. Sem
                    nulla pharetra diam sit amet nisl suscipit. Rutrum tellus
                    pellentesque eu tincidunt. Lectus urna duis convallis
                    convallis tellus. Urna molestie at elementum eu facilisis
                    sed odio morbi quis
                  </p>
                </div>
              </li>

              <li data-aos='fade-up' data-aos-delay='300'>
                <i className='bx bx-help-circle icon-help'></i>{" "}
                <a
                  data-bs-toggle='collapse'
                  data-bs-target='#faq-list-4'
                  className='collapsed'
                >
                  Tempus quam pellentesque nec nam aliquam sem et tortor
                  consequat? <i className='bx bx-chevron-down icon-show'></i>
                  <i className='bx bx-chevron-up icon-close'></i>
                </a>
                <div
                  id='faq-list-4'
                  className='collapse'
                  data-bs-parent='.faq-list'
                >
                  <p>
                    Molestie a iaculis at erat pellentesque adipiscing commodo.
                    Dignissim suspendisse in est ante in. Nunc vel risus commodo
                    viverra maecenas accumsan. Sit amet nisl suscipit adipiscing
                    bibendum est. Purus gravida quis blandit turpis cursus in.
                  </p>
                </div>
              </li>

              <li data-aos='fade-up' data-aos-delay='400'>
                <i className='bx bx-help-circle icon-help'></i>{" "}
                <a
                  data-bs-toggle='collapse'
                  data-bs-target='#faq-list-5'
                  className='collapsed'
                >
                  Tortor vitae purus faucibus ornare. Varius vel pharetra vel
                  turpis nunc eget lorem dolor?{" "}
                  <i className='bx bx-chevron-down icon-show'></i>
                  <i className='bx bx-chevron-up icon-close'></i>
                </a>
                <div
                  id='faq-list-5'
                  className='collapse'
                  data-bs-parent='.faq-list'
                >
                  <p>
                    Laoreet sit amet cursus sit amet dictum sit amet justo.
                    Mauris vitae ultricies leo integer malesuada nunc vel.
                    Tincidunt eget nullam non nisi est sit amet. Turpis nunc
                    eget lorem dolor sed. Ut venenatis tellus in metus vulputate
                    eu scelerisque.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};
export default ScreenLanding;

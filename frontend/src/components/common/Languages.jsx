import { useState } from "react";
import { Form, FloatingLabel, Stack, Badge, Button } from "react-bootstrap";

const Languages = ({ languages, setMember }) => {
  const [language, setLanguage] = useState("");

  const addLanguage = () => {
    languages.push({ name: language });

    setMember((prevState) => ({
      ...prevState,
      languages,
    }));
    setLanguage("");
  };

  const delLanguage = (t) => {
    const temp = languages.filter((lang) => lang.name !== t.name);

    setMember((prevState) => ({
      ...prevState,
      languages: temp,
    }));
  };

  return (
    <>
      <Stack direction='horizontal' gap={2} className='mb-2'>
        {languages &&
          languages.map((t, index) => (
            <Badge key={index} pill bg='primary' onClick={() => delLanguage(t)}>
              {t.name}
            </Badge>
          ))}
      </Stack>
      <Stack direction='horizontal' as='div'>
        <Form.Control
          type='text'
          placeholder={"Enter language"}
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        />
        <Button disabled={!language} onClick={() => addLanguage()}>
          +
        </Button>
      </Stack>
    </>
  );
};

export default Languages;

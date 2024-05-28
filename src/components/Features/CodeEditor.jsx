import React, { useState } from 'react';
import { Box, Button, MenuItem, Select, FormControl,Typography,TextField, InputLabel } from '@mui/material';
import Editor from '@monaco-editor/react';


const languages = [
    { label: "JavaScript", value: "javascript" },
    { label: "Python", value: "python" },
    { label: "C++", value: "cpp" },
];
const file_extensions = [
    { label: "JavaScript", value: "js" },
    { label: "Python", value: "py" },
    { label: "C++", value: "cpp" },
];
function CodeEditor() {
    const [language, setLanguage] = useState(languages[0].value);
    const [fileName, setFileName] = useState(file_extensions[0].value);
    const [initialCode, setInitialCode] = useState('// Write your code here')
    const [output, setOutput] = useState("")
    const[code, setCode] = useState('');
    const changeLanguage = (event) => {
        setLanguage(event.target.value)
        setFileName(event.target.value)
    }

    const compileCode = async () =>{
        try{
            console.log(code)
            const response = await fetch('http://localhost:8080/compile',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({code, language})
            })
            const data = await response.json();
            console.log("---------DATA--------------", data)
            setOutput(data.output);
            console.log(response)
        } catch(e)
        {
            setOutput('Error: Unable to compile code.')
        }
    }
    const saveFile = () => {
        console.log("---------SAVE FILE FUNCTION------------")
        const blob = new Blob([initialCode], { type: "text/plain;charset=utf-8" })
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `code.${fileName}`;
        console.log(link.download);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }


    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#1e1e1e', borderRadius: '4px', padding: '16px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                    <InputLabel sx={{ color: "white" }}>Language</InputLabel>
                    <Select
                        value={language}
                        onChange={changeLanguage}
                        label="Language"
                        sx={{ color: 'white', '.MuiOutlinedInput-notchedOutline': { borderColor: 'white' } }}
                    >
                        {languages.map((lang) => (
                            <MenuItem key={lang.value} value={lang.value}>{lang.label}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                {/* <Button variant="contained" color="primary" onClick={saveFile} onChange={changeLanguage}>Save</Button> */}
                <Button variant="contained" color="primary" onClick={compileCode} sx={{ marginLeft: '16px' }}>
                    Run
                </Button>
            </Box>
            <Box sx={{ flex: 1, marginBottom: '16px' }}>
            <Editor
                height="100%"
                width="100%"
                defaultLanguage="javascript"
                // defaultValue="// Write your code here"
                onChange={(value) => setCode(value || '')}
                theme="vs-dark"
                value={code}
                options={{
                    minimap: { enabled: false },
                }}

            />
            </Box>
            <Box sx={{ flex: 1, backgroundColor: '#333', color: 'white', padding: '8px', overflowY: 'auto' }}>
            <Typography variant="h6">Output</Typography>
                <TextField
                    multiline
                    fullWidth
                    value={output}
                    InputProps={{
                        readOnly: true,
                    }}
                    sx={{ backgroundColor: 'white', color:'white'}}
                />
            </Box>
      
        </Box>
    )
}

export default CodeEditor
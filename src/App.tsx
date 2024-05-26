import './App.css'
import {Components, ConfigItem, Form} from "../lib/main.ts";
import {useRef} from "react";
import {NumberField, Panel, TextField} from "./components";
import {Box, Button} from "@mui/material";

Components.add('text', TextField);
Components.add('number', NumberField)
Components.add('panel',Panel)

const config: ConfigItem[] = [
    {
        "collapsible": true,
        "collapsed": false,
        "key": "panel",
        "type": "panel",
        "label": "Panel 1",
        "input": false,
        "tableView": false,
        nested: true,
        "items": [
            {
                "label": "Panel 1 Text Field",
                "applyMaskOn": "change",
                "tableView": true,
                "key": "textField",
                "type": "text",
                "input": true
            },
            {
                "label": "Panel 1 Number",
                "applyMaskOn": "change",
                "mask": false,
                "tableView": false,
                "delimiter": false,
                "requireDecimal": false,
                "inputFormat": "plain",
                "truncateMultipleSpaces": false,
                "validate": {
                    "required": true
                },
                "key": "number",
                "type": "number",
                "input": true
            }
        ]
    },
    {
        "collapsible": true,
        "collapsed": false,
        "key": "panel",
        "type": "panel",
        "label": "Panel 2",
        "input": false,
        "tableView": false,
        nested: true,
        "items": [
            {
                "label": "Height in cm",
                "applyMaskOn": "change",
                "mask": false,
                "tableView": false,
                "delimiter": false,
                "requireDecimal": false,
                "inputFormat": "plain",
                "truncateMultipleSpaces": false,
                "validate": {
                    "required": true
                },
                "key": "height",
                "type": "number",
                "input": true
            },
            {
                "label": "Weight in kg",
                "applyMaskOn": "change",
                "mask": false,
                "tableView": false,
                "delimiter": false,
                "requireDecimal": false,
                "inputFormat": "plain",
                "truncateMultipleSpaces": false,
                "validate": {
                    "required": true
                },
                "key": "weight",
                "type": "number",
                "input": true
            },
            {
                "label": "BMI",
                "applyMaskOn": "change",
                "tableView": true,
                "key": "bmi",
                "type": "text",
                "input": true,
                "disabled": true,
                "calculation": {
                    "/" : [
                            "weight",
                            {
                                "/": ["height", 100]
                            }
                        ]
                }
            },
        ]
    },
];

function App() {
    const formRef = useRef<{ submit: () => void }>(null);

    const handleSubmit = (values: { [key: string]: unknown }) => {
        console.log('Form values:', values);
    };

    const handleExternalSubmit = () => {
        formRef.current?.submit();
    };

  return (
    <>
        <Form ref={formRef} config={config} onSubmit={handleSubmit} />
        <Box sx={{m: 2}}>
            <Button variant="contained" onClick={handleExternalSubmit}>Submit Form</Button>
        </Box>
    </>
  )
}

export default App

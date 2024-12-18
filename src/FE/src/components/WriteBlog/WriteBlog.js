import React, { useState } from 'react';
import './WriteBlog.css';
import { Editor } from '@tinymce/tinymce-react';

const WriteBlog = () => {
    const [ content, setContent ] = useState('');

    const handleEditorChange = (newContent) => {
        setContent(newContent);
    };


    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', height: "85vh" }} className='write-blog-container'>
            <div className='content' style={{ height: "100%" }}>
                <h2 style={{ marginBottom: '10px', color: '#333', fontSize: "23px", fontWeight: "bold", textAlign: "center" }}>Write your Blog Here</h2>
                <Editor
                    apiKey="qdka9llfo9r760rggqxrkm7eujw1378dgs2z3cnf6zk4he1o" 
                    initialValue=""
                    init={{
                        height: "100%",
                        menubar: false,
                        plugins: 'lists link image code',
                        toolbar: 'undo redo | bold italic underline | alignleft aligncenter alignright | bullist numlist | link image',
                    }}
                    onEditorChange={handleEditorChange}
                />
            </div>
        </div>
    );
};

export default WriteBlog;

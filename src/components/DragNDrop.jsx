/* eslint-disable @next/next/no-img-element */
import {useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';

const thumbsContainer = {
	display: 'flex',
	flexDirection: 'row',
	flexWrap: 'wrap',
	marginTop: 16,
};

const thumb = {
	display: 'flex',
	borderRadius: 2,
	border: '1px solid #eaeaea',
	marginBottom: 8,
	marginRight: 8,
	width: 'auto',
	height: 300,
	padding: 4,
	boxSizing: 'border-box',
	margin: '40px 0 0 0',
};

const thumbInner = {
	display: 'flex',
	flexDirection: 'column',
};

const img = {
	display: 'block',
	width: 'auto',
	height: '100%',
};

export default function DragNDrop() {
	const [files, setFiles] = useState([]);
	const {getRootProps, getInputProps} = useDropzone({
		accept: {
			'image/*': [],
		},
		onDrop: acceptedFiles => {
			setFiles(
				acceptedFiles.map(file =>
					Object.assign(file, {
						preview: URL.createObjectURL(file),
					})
				)
			);
		},
	});
	console.log(useDropzone);
	const thumbs = files.map(file => (
		<div style={thumb} key={file.name}>
			<div style={thumbInner}>
				<img
					alt=""
					src={file.preview}
					style={img}
					onLoad={() => {
						URL.revokeObjectURL(file.preview);
					}}
				/>
				<p>{file.name}</p>
			</div>
		</div>
	));

	useEffect(() => {
		// Make sure to revoke the data uris to avoid memory leaks, will run on unmount
		return () => files.forEach(file => URL.revokeObjectURL(file.preview));
	}, [files]);

	return (
		<section>
			<div {...getRootProps()}>
				<input {...getInputProps()} />
				<p>Drag n drop some files here, or click to select files</p>
				<input type="text" />
			</div>
			<aside style={thumbsContainer}>{thumbs}</aside>
		</section>
	);
}

import path from 'path';
const fs = require('fs');
const util = require('util');
const readdir = util.promisify(fs.readdir);

export default {
  async uploadImage(req, res) {
    try {
      const { filename } = req.file;
      return res.json({ filename: filename });
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },

  async getFileByName(req, res) {
    let fileNm = req.params.fileNm;
    return res.sendFile(path.join(process.cwd(), './uploads/files/' + fileNm));
  },

  async getFileByNameHisSync(req, res) {
    try{
      let fileNm = req.query.fileNm;
      return res.sendFile(path.join(process.cwd(), './hissync/' + fileNm));
    }catch (e) {
      return res.status(500).json({success: false, message: 'Lỗi truy vấn dữ liệu'})
    }

  },

  async getFileByNameHisSyncCDHA(req, res) {
    try{
      let fileNm = req.query.fileNm;
      let makcb = req.query.makcb;
      if(!fileNm || !makcb) return res.status(400).json({success: false, message: 'Lỗi truy vấn dữ liệu'})

      return res.sendFile(path.join(process.cwd(), './hissync/HinhAnh/' + makcb + '/' + fileNm));
    }catch (e) {
      return res.status(500).json({success: false, message: 'Lỗi truy vấn dữ liệu'})
    }

  },

  async getFileByNameHisSyncFile(req, res) {
    try{
      let {makcb, fileNm} = req.params;

      if(!fileNm || !makcb) return res.status(400).json({success: false, message: 'Lỗi truy vấn dữ liệu'})

      return res.sendFile(path.join(process.cwd(), './hissync/HinhAnh/' + makcb + '/' + fileNm));
    }catch (e) {
      return res.status(500).json({success: false, message: 'Lỗi truy vấn dữ liệu'})
    }

  },

  async getListFileNameCDHA(req, res) {
    try {
      let makcb = req.query.makcb;
      let urlFolder = path.join(process.cwd(), './hissync/HinhAnh/' + makcb);
      if (fs.existsSync(urlFolder) && makcb) {
        let names;
        let image = [];
        let video = [];
        names = await readdir(urlFolder);
        names.forEach(filename => {
          let fileExt = filename.split('.').pop();
          console.log(fileExt,filename, 'filename')
          if(fileExt === 'bmp' && image.length < 6){
            image.push(filename)
          }
          if(fileExt === 'mp4' && video.length < 2){
            video.push(filename)
          }
        })
        return res.json({image: image, video: video})
      }
      return res.json({image: [], video: []})
    }catch (e) {
      console.log(e)
      return res.status(500).json({success: false, message: 'Lỗi truy vấn dữ liệu'})
    }
  },

  async getFileByNameHisSyncTest(req, res) {
    ///usr/src/app/hissync/2000000001\\2_1\\0106201129461.bmp
    let fileNm = req.query.fileNm;
    return res.sendFile(path.join(process.cwd(), './hissync/2000000001/2_1/0106201129461.bmp'));
  },

  async getImageByName(req, res) {
    let imgNm = req.params.fileNm;
    return res.sendFile(path.join(process.cwd(), './uploads/images/' + imgNm));
  },

  async getAvatarByName(req, res) {
    let imgNm = req.params.imgNm;
    return res.sendFile(path.join(process.cwd(), './uploads/avatar/' + imgNm));
  },

};

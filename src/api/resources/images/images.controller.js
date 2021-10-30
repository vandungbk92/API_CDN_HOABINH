import path from 'path';
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
    let fileNm = req.query.fileNm;
    return res.sendFile(path.join(process.cwd(), './hissync/' + fileNm));
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

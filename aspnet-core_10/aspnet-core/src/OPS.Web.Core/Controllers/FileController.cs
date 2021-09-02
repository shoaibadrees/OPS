using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using OPS.Files;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Abp.AspNetCore.Mvc.Controllers;
using Abp.Domain.Repositories;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using OPS.HotelService.FoodItem.Dto;
using OPS.HotelService.Project_Paths;
using OPS.Models;
using OPS.OPS_Models;

namespace OPS.Controllers
{
    //[Route("api/[controller]/[action]")]
     //[Route("api/[controller]/[action]")]
   // [DisableFormValueModelBinding]
    public class FileController : OPSControllerBase
    {

        private readonly IRepository<Items> _ItemRepository;
        private readonly IWebHostEnvironment _hostingEnvironment;
        public FileController(IWebHostEnvironment hostingEnvironment, IRepository<Items> ItemRepository)
        {
            _hostingEnvironment = hostingEnvironment;
            _ItemRepository = ItemRepository;
        }

        [HttpPost]
        public async Task<IActionResult> UploadPhoto()

        {
            var itemImagesPath = Project_Paths.Path_ItemsPhotos;


            var file = Request.Form.Files[0];
            var itemId = Request.Form["ItemId"];
            // var path = Path.Combine(itemImagesPath, "ItemImages");

            // var finalImageName = imageName.Replace(imageName, itemFinalName);
            //create directory if it does not exist
            if (!System.IO.Directory.Exists(itemImagesPath))
            {
                System.IO.Directory.CreateDirectory(itemImagesPath);
            }


            if (file.Length > 0)
            {
                var imageName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                string fileExtention = System.IO.Path.GetExtension(file.FileName);
                var fullPath = Path.Combine(itemImagesPath, itemId + fileExtention);

                DirectoryInfo d = new DirectoryInfo(itemImagesPath);
                FileInfo[] files = d.GetFiles(itemId + ".*");

                foreach (var file1 in files)
                {
                    System.IO.File.Delete(file1.FullName);
                }

                //var dbPath = Path.Combine(folderName, fileName);
                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    file.CopyTo(stream);
                }

                var item = _ItemRepository.Get(Convert.ToInt32(itemId));

                item.HasPhoto = true;
                var updateitem = await _ItemRepository.UpdateAsync(item);

                return Ok(true);
            }

            return Ok(false);
        }


        public IActionResult getItemsImages()
        {
            var itemImagesPath = Project_Paths.Path_ItemsPhotos;
            //Fetch all files in the Folder (Directory).
            string[] filePaths = Directory.GetFiles(Path.Combine(itemImagesPath, "ItemImages"));

            //Copy File names to Model collection.
            List<GetItemsImagesDto> files = new List<GetItemsImagesDto>();
            foreach (string filePath in filePaths)
            {
                files.Add(new GetItemsImagesDto { ImageName = Path.GetFileName(filePath) });
            }

            return View(files);
        }
        [HttpDelete]
        public async Task<Boolean> deleteItemPhoto(int itemId)
        {
            var itemImagesPath = Project_Paths.Path_ItemsPhotos;

            DirectoryInfo d = new DirectoryInfo(itemImagesPath);
            FileInfo[] files = d.GetFiles(itemId + ".*");

            foreach (var file1 in files)
            {
                System.IO.File.Delete(file1.FullName);
            }

            var item = _ItemRepository.Get(Convert.ToInt32(itemId));

            item.HasPhoto = false;
            await _ItemRepository.UpdateAsync(item);
            return true;

        }
        public async Task<bool> deletePerItemPhoto(int itemId)
        {
            var itemImagesPath = Project_Paths.Path_ItemsPhotos;

            DirectoryInfo d = new DirectoryInfo(itemImagesPath);
            FileInfo[] files = d.GetFiles(itemId + ".*");

            foreach (var file1 in files)
            {
                System.IO.File.Delete(file1.FullName);
            }
            return true;

        }


        [HttpGet]
        //[DisableFormValueModelBinding]
        public async Task<IActionResult> downloadPhoto(int itemId)
        {

            string photosPath = Project_Paths.Path_ItemsPhotos;
            if (!System.IO.Directory.Exists(photosPath))
            {
                System.IO.Directory.CreateDirectory(photosPath);
            }

            string fullFileName = photosPath + itemId;
            string fileName = itemId.ToString();

            DirectoryInfo d = new DirectoryInfo(photosPath);
            FileInfo[] files = d.GetFiles(fileName + ".*");

            if (files.Length > 0)
            {
                fullFileName = files[0].FullName;
                fileName = files[0].Name;
            }
            else
            {
                //return new HttpResponseMessage(HttpStatusCode.NotFound);
            }
            // byte[] bytes = ItemId; ////-------------
            using (MemoryStream ms = new MemoryStream())
            {
                using (FileStream file = new FileStream(fullFileName, FileMode.Open, FileAccess.Read))
                {

                    var net = new System.Net.WebClient();
                    var data = net.DownloadData(fullFileName);
                    var content = new System.IO.MemoryStream(data);
                    var contentType = "image/jpg";
                    //   var fileName = "something.bin";
                   return File(content, contentType, fileName);
                }
            }

        }


    }


}

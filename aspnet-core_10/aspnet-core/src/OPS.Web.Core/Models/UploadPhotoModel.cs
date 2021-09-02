using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace OPS.Models
{
   public class UploadPhotoModel
    {
        public long UserId { get; set; }
        public IFormFile ProfileImage { get; set; }   
    }
}

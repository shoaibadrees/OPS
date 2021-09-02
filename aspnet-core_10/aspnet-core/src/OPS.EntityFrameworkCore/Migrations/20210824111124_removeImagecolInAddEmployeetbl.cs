using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace OPS.Migrations
{
    public partial class removeImagecolInAddEmployeetbl : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Image",
                table: "AddEmployee");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<byte[]>(
                name: "Image",
                table: "AddEmployee",
                type: "image",
                nullable: true);
        }
    }
}

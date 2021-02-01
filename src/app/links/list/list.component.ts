import { Component, OnInit } from '@angular/core';
import { LinkService } from 'src/app/_services/link.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  links: any;
  constructor(private linkService: LinkService) { }

  ngOnInit(): void {
    this.linkService.getAll()
            .pipe(first())
            .subscribe(links => this.links = links);
  }
}
